/*
  # Initial Schema Setup for POD Application

  1. New Tables
    - `jobs`
      - Core delivery job information
      - Tracks sender, receiver, and delivery details
    - `delivery_confirmations`
      - Stores POD (Proof of Delivery) data
      - Links to jobs and includes signature data

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure access to sensitive delivery data

  3. Types
    - `job_status`: Enum for tracking delivery status
*/

-- Create custom types
CREATE TYPE job_status AS ENUM ('Transit', 'Completed');

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_number TEXT UNIQUE NOT NULL,
  reference_number TEXT,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  receiver_name TEXT NOT NULL,
  address TEXT NOT NULL,
  items TEXT NOT NULL,
  status job_status DEFAULT 'Transit',
  driver_name TEXT,
  driver_phone TEXT,
  origin TEXT DEFAULT 'MEL, VIC',
  destination TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Delivery confirmations table
CREATE TABLE IF NOT EXISTS delivery_confirmations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  recipient_name TEXT NOT NULL,
  signature TEXT,
  items_delivered TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  user_id uuid REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_confirmations ENABLE ROW LEVEL SECURITY;

-- Policies for jobs table
CREATE POLICY "Users can view their own jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for delivery_confirmations table
CREATE POLICY "Users can view their delivery confirmations"
  ON delivery_confirmations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create delivery confirmations"
  ON delivery_confirmations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
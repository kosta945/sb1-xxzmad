import { supabase } from '../lib/supabase';

export async function testConnection() {
  try {
    // First verify the connection URL and key are present
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('Missing Supabase configuration. Please check your .env file.');
      return false;
    }

    // Test a simple query that doesn't require auth
    const { data, error } = await supabase
      .from('jobs')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (error) {
      // Handle specific error cases
      if (error.code === 'PGRST301') {
        console.error('Authentication failed. Check your SUPABASE_ANON_KEY');
        return false;
      }
      if (error.code === '42P01') {
        console.error('Table "jobs" does not exist. Check if migrations were applied');
        return false;
      }
      if (error.code === 'ECONNREFUSED' || error.code === 'fetch-failed') {
        console.error('Could not connect to Supabase. Check your SUPABASE_URL and internet connection');
        return false;
      }
      
      console.error('Supabase error:', error.message, 'Code:', error.code);
      return false;
    }

    console.log('✅ Successfully connected to Supabase');
    return true;
  } catch (err) {
    if (err instanceof Error) {
      console.error('Failed to connect to Supabase:', err.message);
    } else {
      console.error('Failed to connect to Supabase:', err);
    }
    return false;
  }
}
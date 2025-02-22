import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { generatePodLink, generateSmsMessage } from '../utils/podUtils';

interface ContactDetailsFormProps {
  onSubmit: (data: ContactFormData) => void;
  jobData?: {
    items: string;
    address: string;
    consignmentNumber: string;
  };
}

export interface ContactFormData {
  senderEmail: string;
  driverName: string;
  driverPhone: string;
}

export function ContactDetailsForm({ onSubmit, jobData }: ContactDetailsFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const contactData = {
      senderEmail: formData.get('senderEmail') as string,
      driverName: formData.get('driverName') as string,
      driverPhone: formData.get('driverPhone') as string,
    };

    if (jobData) {
      const podLink = generatePodLink(jobData.consignmentNumber);
      const smsMessage = generateSmsMessage(
        contactData.driverName,
        jobData.items,
        jobData.address,
        podLink
      );
      
      console.log('SMS Message to be sent:', smsMessage);
    }

    onSubmit(contactData);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-medium text-gray-900">Create Job</h2>
        <div className="w-8"></div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Add contact detail</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enter in your drivers mobile number and we'll SMS them a link. Once the delivery is completed and POD is captured, we'll email you the completed POD
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Where the POD will be emailed
            </label>
            <input
              type="email"
              name="senderEmail"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm placeholder-gray-400"
            />
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Send Job link via SMS
            </label>
            <div className="space-y-4">
              <input
                type="text"
                name="driverName"
                placeholder="Delivery Driver Name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm placeholder-gray-400"
              />
              <input
                type="tel"
                name="driverPhone"
                placeholder="Delivery Driver Phone #"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 px-6 bg-gray-100 text-gray-500 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-6 bg-[#00BCD4] text-white rounded-full font-medium hover:bg-[#00ACC1] transition-colors shadow-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
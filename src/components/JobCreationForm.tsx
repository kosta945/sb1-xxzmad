import React from 'react';
import { Package, Home } from 'lucide-react';

interface JobCreationFormProps {
  onNext: (data: JobFormData) => void;
}

export interface JobFormData {
  senderName: string;
  receiverName: string;
  address: string;
  consignmentNumber: string;
  referenceNumber: string;
  items: string;
}

export function JobCreationForm({ onNext }: JobCreationFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onNext({
      senderName: formData.get('senderName') as string,
      receiverName: formData.get('receiverName') as string,
      address: formData.get('address') as string,
      consignmentNumber: formData.get('consignmentNumber') as string,
      referenceNumber: formData.get('referenceNumber') as string,
      items: formData.get('items') as string,
    });
  };

  const handleViewTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.search = 'terms';
  };

  const handleHome = () => {
    window.location.search = 'jobs';
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Create Job</h1>
        <p className="text-sm text-gray-500">
          One time Proof of Delivery capture.
          <br />
          Never have a driver say no to getting a POD again
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            name="senderName"
            placeholder="Sender Name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
          />
        </div>

        <div>
          <input
            type="text"
            name="receiverName"
            placeholder="Receiver Name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
          />
        </div>

        <div>
          <input
            type="text"
            name="address"
            placeholder="Delivery Address"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
          />
        </div>

        <div>
          <input
            type="text"
            name="consignmentNumber"
            placeholder="Consignment #"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
          />
        </div>

        <div>
          <input
            type="text"
            name="referenceNumber"
            placeholder="Reference"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
          />
        </div>

        <div>
          <input
            type="text"
            name="items"
            placeholder="Items"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
          />
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            id="terms"
            required
            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-gray-600">
            I Accept{' '}
            <button
              onClick={handleViewTerms}
              className="text-blue-500 hover:underline"
            >
              terms and conditions
            </button>
          </label>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={handleHome}
            className="flex-1 py-3 px-6 bg-gray-100 text-gray-500 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Home
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-6 bg-[#00BCD4] text-white rounded-full font-medium hover:bg-[#00ACC1] transition-colors shadow-lg"
          >
            NEXT
          </button>
        </div>
      </form>
    </div>
  );
}
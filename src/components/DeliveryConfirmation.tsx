import React, { useState, useEffect } from 'react';
import { SignaturePad } from './SignaturePad';
import { ArrowLeft, Package, HelpCircle, Link as LinkIcon } from 'lucide-react';
import { Job, getJobByConsignment, updateJobStatus, DeliveryItems } from '../utils/jobStore';
import { OwlLogo } from './icons/OwlLogo';
import { generatePodLink } from '../utils/podUtils';

interface DeliveryConfirmationProps {
  onComplete: (signature: string) => void;
}

export function DeliveryConfirmation({ onComplete }: DeliveryConfirmationProps) {
  const [recipientName, setRecipientName] = useState('');
  const [itemsDelivered, setItemsDelivered] = useState('');
  const [jobData, setJobData] = useState<Job | null>(null);
  const [signature, setSignature] = useState<string>('');

  useEffect(() => {
    const consignmentNumber = new URLSearchParams(window.location.search).get('confirm');
    if (consignmentNumber) {
      const job = getJobByConsignment(consignmentNumber);
      if (job) {
        setJobData(job);
        setItemsDelivered(job.items);
      }
    }
  }, []);

  const handleComplete = () => {
    if (!recipientName.trim()) {
      alert('Please enter recipient name');
      return;
    }

    if (!itemsDelivered.trim()) {
      alert('Please enter items delivered');
      return;
    }

    if (!signature) {
      alert('Please capture signature');
      return;
    }
    
    const consignmentNumber = new URLSearchParams(window.location.search).get('confirm');
    if (consignmentNumber) {
      const deliveryItems: DeliveryItems = {
        expected: jobData?.items || '',
        delivered: itemsDelivered
      };
      
      updateJobStatus(
        consignmentNumber, 
        'Completed', 
        signature, 
        recipientName,
        deliveryItems
      );
    }
    
    onComplete(signature);
  };

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <OwlLogo className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600">The delivery job you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const podUrl = generatePodLink(jobData.consignmentNumber);

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => window.location.search = 'jobs'}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Transit
            </span>
            <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold">Delivery from: {jobData.senderName}</h2>
              <div className="flex items-center mt-1">
                <div className="w-full max-w-[200px]">
                  <div className="h-1 bg-gray-200 rounded">
                    <div className="h-1 bg-blue-500 w-2/3 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Receiver Info</h3>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium">Receiver Name: {jobData.receiverName}</p>
              <p className="text-sm mt-1">Address: {jobData.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Consignment #</p>
              <p className="text-sm font-medium">{jobData.consignmentNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Reference #</p>
              <p className="text-sm font-medium">{jobData.referenceNumber}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-1"># of items</p>
            <p className="text-sm font-medium">1</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Driver Link:</p>
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <a
                href={podUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline break-all"
              >
                {podUrl}
              </a>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Confirmation</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="itemsDelivered" className="block text-sm font-medium text-gray-700 mb-2">
                  Items Delivered
                </label>
                <input
                  type="text"
                  id="itemsDelivered"
                  value={itemsDelivered}
                  onChange={(e) => setItemsDelivered(e.target.value)}
                  className="block w-full rounded-lg border-2 border-gray-300 px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Signature
                </label>
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <SignaturePad onSave={setSignature} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t-2 border-gray-200">
          <button
            onClick={handleComplete}
            className="w-full py-3 px-4 bg-[#00BCD4] text-white rounded-full font-medium hover:bg-[#00ACC1] transition-colors shadow-lg"
          >
            Complete Delivery
          </button>
        </div>
      </div>
    </div>
  );
}
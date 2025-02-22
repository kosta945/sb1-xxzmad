import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function TermsAndConditions() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold ml-2">Terms and Conditions</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By using PODOWL's services, you agree to these terms and conditions. These terms govern your use of our proof of delivery capture and management system. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
            <p className="text-gray-600">
              PODOWL provides digital proof of delivery services, including:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-600 space-y-1">
              <li>Electronic signature capture</li>
              <li>Delivery confirmation and tracking</li>
              <li>Real-time delivery status updates</li>
              <li>Digital proof of delivery documentation</li>
              <li>Secure storage of delivery records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
            <div className="space-y-3 text-gray-600">
              <p>Users must:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Provide accurate and truthful information</li>
                <li>Ensure all captured signatures are authentic and authorized</li>
                <li>Maintain confidentiality of account credentials</li>
                <li>Report any unauthorized system access</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Privacy Policy</h2>
            <div className="space-y-3 text-gray-600">
              <h3 className="font-medium text-gray-800 mt-4">4.1 Data Collection</h3>
              <p>We collect the following information:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Names and contact details of senders and receivers</li>
                <li>Delivery addresses and locations</li>
                <li>Electronic signatures</li>
                <li>Delivery timestamps and status updates</li>
                <li>Device information for service optimization</li>
              </ul>

              <h3 className="font-medium text-gray-800 mt-4">4.2 Data Usage</h3>
              <p>Your data is used for:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Processing and confirming deliveries</li>
                <li>Generating proof of delivery documentation</li>
                <li>Service improvement and optimization</li>
                <li>Communication regarding delivery status</li>
              </ul>

              <h3 className="font-medium text-gray-800 mt-4">4.3 Data Protection</h3>
              <p>We protect your data through:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Encryption of sensitive information</li>
                <li>Secure storage systems</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Electronic Signatures</h2>
            <div className="space-y-3 text-gray-600">
              <p>Electronic signatures captured through our system:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Are legally binding and equivalent to handwritten signatures</li>
                <li>Comply with electronic signature regulations</li>
                <li>Include timestamp and geolocation data</li>
                <li>Are securely stored and protected</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Liability</h2>
            <div className="space-y-3 text-gray-600">
              <p>PODOWL:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Provides services "as is" without warranties</li>
                <li>Is not liable for delivery delays or failures</li>
                <li>Maintains regular backups of delivery records</li>
                <li>Recommends users maintain their own records</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
            <p className="text-gray-600">
              PODOWL reserves the right to modify these terms at any time. Users will be notified of significant changes. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
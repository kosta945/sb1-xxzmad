import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProgressIndicator } from './components/ProgressIndicator';
import { JobCreationForm, JobFormData } from './components/JobCreationForm';
import { ContactDetailsForm, ContactFormData } from './components/ContactDetailsForm';
import { DeliveryConfirmation } from './components/DeliveryConfirmation';
import { JobList } from './components/JobList';
import { TermsAndConditions } from './components/TermsAndConditions';
import { saveJob, updateJobStatus } from './utils/jobStore';
import { OwlLogo } from './components/icons/OwlLogo';
import { Package, Truck, CheckCircle } from 'lucide-react';

// Get the consignment number from search params
function getConsignmentNumber(): string | null {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('confirm');
}

const isDeliveryConfirmation = getConsignmentNumber() !== null;
const isJobList = window.location.search.includes('jobs');
const isTerms = window.location.search.includes('terms');
const isFirstVisit = !localStorage.getItem('podowl_visited');

export function App() {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState<JobFormData | null>(null);
  const [showSplash, setShowSplash] = useState(isFirstVisit && !isJobList && !isDeliveryConfirmation);

  useEffect(() => {
    if (isFirstVisit) {
      localStorage.setItem('podowl_visited', 'true');
      const timer = setTimeout(() => setShowSplash(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJobFormSubmit = (data: JobFormData) => {
    setJobData(data);
    setStep(2);
  };

  const handleContactFormSubmit = (contactData: ContactFormData) => {
    if (jobData) {
      saveJob(jobData, contactData);
      window.location.search = 'jobs';
    }
  };

  const handleDeliveryComplete = (signature: string) => {
    const consignmentNumber = getConsignmentNumber();
    if (consignmentNumber) {
      updateJobStatus(consignmentNumber, 'Completed', signature);
      window.location.search = 'jobs';
    }
  };

  const handleGetStarted = () => {
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {showSplash ? (
        <div className="min-h-screen bg-gradient-to-br from-[#00BCD4] to-[#006064]">
          <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center text-white">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-lg"></div>
              <OwlLogo className="h-24 w-24 text-white relative" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-center">PODOWL</h1>
            <p className="text-xl text-white/90 mb-12 text-center">
              The Smart Way to Handle Proof of Delivery
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2">Easy Creation</h3>
                <p className="text-sm text-white/80">Create delivery jobs in seconds with our intuitive interface</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
                <Truck className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
                <p className="text-sm text-white/80">Monitor deliveries and get instant status updates</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-white" />
                <h3 className="text-lg font-semibold mb-2">Digital POD</h3>
                <p className="text-sm text-white/80">Capture signatures and proof of delivery electronically</p>
              </div>
            </div>

            <button
              onClick={handleGetStarted}
              className="bg-white text-[#00BCD4] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Get Started
            </button>

            <div className="absolute bottom-8 w-full max-w-lg mx-auto px-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full animate-[loading_3s_ease-in-out]" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isDeliveryConfirmation ? (
            <DeliveryConfirmation onComplete={handleDeliveryComplete} />
          ) : isJobList ? (
            <JobList />
          ) : isTerms ? (
            <TermsAndConditions />
          ) : (
            <div className="pt-6">
              <ProgressIndicator currentStep={step} totalSteps={2} />
              {step === 1 ? (
                <JobCreationForm onNext={handleJobFormSubmit} />
              ) : (
                <ContactDetailsForm onSubmit={handleContactFormSubmit} jobData={jobData || undefined} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
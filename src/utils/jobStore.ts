export interface DeliveryItems {
  expected: string;
  delivered: string;
}

export interface Job {
  id: string;
  status: 'Transit' | 'Completed';
  senderName: string;
  receiverName: string;
  address: string;
  consignmentNumber: string;
  referenceNumber: string;
  items: string;
  origin: string;
  destination: string;
  date: string;
  driverName?: string;
  driverPhone?: string;
  senderEmail?: string;
  signature?: string;
  podRecipientName?: string;
  deliveredItems?: DeliveryItems;
}

const JOBS_STORAGE_KEY = 'podowl_jobs';

export function generateJobId(): string {
  const prefix = ['AED', 'RGN', 'POD'][Math.floor(Math.random() * 3)];
  const number = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}-${number}`;
}

export function saveJob(jobData: any, contactData: any): void {
  const jobs = getJobs();
  const newJob: Job = {
    ...jobData,
    id: generateJobId(),
    status: 'Transit',
    origin: 'MEL, VIC',
    destination: jobData.address.split('\n')[0],
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }),
    ...contactData,
  };
  
  jobs.unshift(newJob);
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
}

export function getJobs(): Job[] {
  const jobsData = localStorage.getItem(JOBS_STORAGE_KEY);
  return jobsData ? JSON.parse(jobsData) : [];
}

export function getJobByConsignment(consignmentNumber: string): Job | undefined {
  const jobs = getJobs();
  return jobs.find(job => job.consignmentNumber === consignmentNumber);
}

export function updateJobStatus(
  consignmentNumber: string, 
  status: 'Transit' | 'Completed', 
  signature?: string, 
  podRecipientName?: string,
  deliveredItems?: DeliveryItems
): void {
  const jobs = getJobs();
  const updatedJobs = jobs.map(job => 
    job.consignmentNumber === consignmentNumber 
      ? { 
          ...job, 
          status,
          ...(signature && { signature }),
          ...(podRecipientName && { podRecipientName }),
          ...(deliveredItems && { deliveredItems }),
          ...(status === 'Completed' && { 
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          })
        } 
      : job
  );
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updatedJobs));
}
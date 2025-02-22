export function generatePodLink(consignmentNumber: string): string {
  // Use window.location.origin for local development, otherwise use podowl.com.au
  const baseUrl = window.location.hostname === 'localhost' ? window.location.origin : 'https://podowl.com.au';
  return `${baseUrl}/?confirm=${consignmentNumber}`;
}

export function generateSmsMessage(driverName: string, items: string, address: string, podLink: string): string {
  return `Hey ${driverName}, click this link to capture a Proof of Delivery for the ${items} going to ${address}. ${podLink}`;
}

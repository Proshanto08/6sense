import axios, { AxiosInstance } from 'axios';

export const initializeBrevoClient = (): AxiosInstance => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY environment variable is required');
  }

  const brevoClient = axios.create({
    baseURL: 'https://api.brevo.com/v3',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
  });

  return brevoClient;
};
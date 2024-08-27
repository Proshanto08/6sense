import axios from 'axios';
import handleApiRequest from '../../utils/apiUtils';
import { IApiResponse } from '../../types';

interface IBrevoEmailOptions {
  subject: string;
  htmlContent: string;
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  replyTo?: { email: string; name?: string };
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
  attachments?: Array<{ url?: string; content?: string; name: string }>;
}


interface ITransactionalEmailFilter {
  email?: string;
  templateId?: number;
  messageId?: string;
  startDate?: string;
  endDate?: string;
  sort?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

const apiKey = process.env.BREVO_API_KEY || '';

export const sendBrevoEmail = async (options: IBrevoEmailOptions): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    axios.post(
      'https://api.brevo.com/v3/smtp/email',
      options,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      }
    )
  );
};

export const getTransactionalEmails = async (
  filters: ITransactionalEmailFilter
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    axios.get(
      'https://api.brevo.com/v3/smtp/emails',
      {
        params: {
          ...filters,
        },
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      }
    )
  );
};

import axios from 'axios';
import { handleSuccess, handleError } from '../../utils/responseHandlers';
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

export const sendBrevoEmail = async (
  options: IBrevoEmailOptions
): Promise<IApiResponse> => {
  const { subject, htmlContent, sender, to, replyTo, headers, params, attachments } = options;

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        subject,
        htmlContent,
        sender,
        to,
        replyTo,
        headers,
        params,
        attachments,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY || '',
        },
      }
    );

    return handleSuccess(response, 'Email successfully sent');
  } catch (error) {
    return handleError(error);
  }
};

export const getTransactionalEmails = async (
  filters: ITransactionalEmailFilter
): Promise<IApiResponse> => {
  const { email, templateId, messageId, startDate, endDate, sort = 'desc', limit = 500, offset = 0 } = filters;

  try {
    const response = await axios.get(
      'https://api.brevo.com/v3/smtp/emails',
      {
        params: {
          email,
          templateId,
          messageId,
          startDate,
          endDate,
          sort,
          limit,
          offset,
        },
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY || '',
        },
      }
    );

    return handleSuccess(response, 'Transactional emails retrieved successfully');
  } catch (error) {
    return handleError(error);
  }
};

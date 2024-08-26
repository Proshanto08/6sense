import axios from 'axios';

interface BrevoEmailOptions {
  subject: string;
  htmlContent: string;
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  replyTo?: { email: string; name?: string };
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
  attachments?: Array<{ url?: string; content?: string; name: string }>;
}

interface TransactionalEmailFilter {
  email?: string;
  templateId?: number;
  messageId?: string;
  startDate?: string; 
  endDate?: string;   
  sort?: 'asc' | 'desc'; 
  limit?: number; 
  offset?: number;
}

interface TransactionalEmailResponse {
  status: number;
  data: any;
  message?: string;
  errorCode?: string;
}


export const sendBrevoEmail = async (options: BrevoEmailOptions) => {
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
        attachments
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY || '',
        },
      }
    );

    return {
      status: response.status,
      data: response.data,
      message: 'Email successfully sent',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.code,
      message: errorResponse.message || 'An error occurred',
      data: {},
    };
  }
};



export const getTransactionalEmails = async (
  filters: TransactionalEmailFilter
): Promise<TransactionalEmailResponse> => {
  const {
    email,
    templateId,
    messageId,
    startDate,
    endDate,
    sort = 'desc',
    limit = 500,
    offset = 0
  } = filters;

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
          offset
        },
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY || '',
        }
      }
    );

    return {
      status: response.status,
      data: response.data,
      message: 'Transactional emails retrieved successfully',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.code,
      message: errorResponse.message || 'An error occurred',
      data: {},
    };
  }
};

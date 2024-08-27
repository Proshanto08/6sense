import axios from 'axios';
import { sendBrevoEmail, getTransactionalEmails } from './brevoEmailService';
import { IApiResponse } from '../../types';
import { handleSuccess, handleError } from '../../utils/responseHandlers';

jest.mock('axios');
jest.mock('../../utils/responseHandlers');

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();
});

const mockSuccessResponse = (method: 'post' | 'get', status: number, data: any) => {
  mockedAxios[method].mockResolvedValue({ status, data });
};

const mockErrorResponse = (method: 'post' | 'get', errorMessage: string) => {
  mockedAxios[method].mockRejectedValue(new Error(errorMessage));
};

const mockHandleSuccess = (status: number, message: string) => {
  (handleSuccess as jest.Mock).mockImplementation((response, msg) => ({
    status: response.status,
    message: msg || message,
  }));
};

const mockHandleError = (status: number, errorMessage: string) => {
  (handleError as jest.Mock).mockImplementation((err) => ({
    status,
    message: errorMessage || err.message,
  }));
};

describe('Email Service', () => {
  describe('sendBrevoEmail', () => {
    it('should send an email successfully', async () => {
      const emailOptions = {
        subject: 'Test Subject',
        htmlContent: '<p>Test Content</p>',
        sender: { name: 'Sender Name', email: 'sender@example.com' },
        to: [{ email: 'recipient@example.com', name: 'Recipient Name' }],
        replyTo: { email: 'replyto@example.com', name: 'Reply To' },
        headers: { 'X-Custom-Header': 'value' },
        params: { param1: 'value1' },
        attachments: [{ name: 'attachment.txt', content: 'file content' }],
      };

      mockSuccessResponse('post', 200, {});
      mockHandleSuccess(200, 'Email successfully sent');

      const result: IApiResponse = await sendBrevoEmail(emailOptions);

      expect(result.status).toBe(200);
      expect(result.message).toBe('Email successfully sent');
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.brevo.com/v3/smtp/email',
        emailOptions,
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY || '',
          },
        }
      );
    });

    it('should handle errors when sending an email', async () => {
      const emailOptions = {
        subject: 'Test Subject',
        htmlContent: '<p>Test Content</p>',
        sender: { name: 'Sender Name', email: 'sender@example.com' },
        to: [{ email: 'recipient@example.com', name: 'Recipient Name' }],
      };

      mockErrorResponse('post', 'Error');
      mockHandleError(500, 'Error');

      const result: IApiResponse = await sendBrevoEmail(emailOptions);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('getTransactionalEmails', () => {
    it('should retrieve transactional emails successfully', async () => {
      const filters = {
        email: 'test@example.com',
        templateId: 1,
        messageId: 'msg123',
        startDate: '2024-08-01',
        endDate: '2024-08-31',
        sort: 'desc' as 'asc' | 'desc', // Explicitly cast to the allowed type
        limit: 10,
        offset: 0,
      };

      mockSuccessResponse('get', 200, {});
      mockHandleSuccess(200, 'Transactional emails retrieved successfully');

      const result: IApiResponse = await getTransactionalEmails(filters);

      expect(result.status).toBe(200);
      expect(result.message).toBe('Transactional emails retrieved successfully');
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.brevo.com/v3/smtp/emails',
        {
          params: filters,
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY || '',
          },
        }
      );
    });

    it('should handle errors when retrieving transactional emails', async () => {
      const filters = {
        email: 'test@example.com',
      };

      mockErrorResponse('get', 'Error');
      mockHandleError(500, 'Error');

      const result: IApiResponse = await getTransactionalEmails(filters);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });
});

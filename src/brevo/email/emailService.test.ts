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

describe('Email Service', () => {
  describe('sendBrevoEmail', () => {
    it('should send an email successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedAxios.post.mockResolvedValue(mockResponse);
      (handleSuccess as jest.Mock).mockImplementation((response, message) => ({
        status: response.status,
        message,
      }));

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
      const error = new Error('Error');
      mockedAxios.post.mockRejectedValue(error);
      (handleError as jest.Mock).mockImplementation((err) => ({
        status: 500,
        message: err.message,
      }));

      const emailOptions = {
        subject: 'Test Subject',
        htmlContent: '<p>Test Content</p>',
        sender: { name: 'Sender Name', email: 'sender@example.com' },
        to: [{ email: 'recipient@example.com', name: 'Recipient Name' }],
      };

      const result: IApiResponse = await sendBrevoEmail(emailOptions);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('getTransactionalEmails', () => {
    it('should retrieve transactional emails successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedAxios.get.mockResolvedValue(mockResponse);
      (handleSuccess as jest.Mock).mockImplementation((response, message) => ({
        status: response.status,
        message,
      }));

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
      const error = new Error('Error');
      mockedAxios.get.mockRejectedValue(error);
      (handleError as jest.Mock).mockImplementation((err) => ({
        status: 500,
        message: err.message,
      }));

      const filters = {
        email: 'test@example.com',
      };

      const result: IApiResponse = await getTransactionalEmails(filters);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });
});

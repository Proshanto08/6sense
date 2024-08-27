import { initializeBrevoClient } from '../../config/brevoConfig';
import { createEvent } from './brevoEventService';
import { IApiResponse } from '../../types';
import { handleSuccess, handleError } from '../../utils/responseHandlers';

jest.mock('../../config/brevoConfig');
jest.mock('../../utils/responseHandlers');

const mockedBrevoClient = {
  post: jest.fn(),
};

beforeEach(() => {
  (initializeBrevoClient as jest.Mock).mockReturnValue(mockedBrevoClient);
  jest.clearAllMocks();
});

describe('Event Service', () => {
  describe('createEvent', () => {
    it('should create an event successfully', async () => {
      const mockResponse = { status: 201, data: {} };
      mockedBrevoClient.post.mockResolvedValue(mockResponse);
      (handleSuccess as jest.Mock).mockImplementation((response, message) => ({
        status: response.status,
        message,
      }));

      const eventOptions = {
        event_name: 'UserSignup',
        event_date: '2024-08-27',
        identifiers: { email_id: 'test@example.com' },
        contact_properties: { name: 'John Doe' },
        event_properties: { source: 'website' },
      };

      const result: IApiResponse = await createEvent(eventOptions);

      expect(result.status).toBe(201);
      expect(result.message).toBe('Event created successfully');
      expect(mockedBrevoClient.post).toHaveBeenCalledWith('/events', eventOptions);
    });

    it('should handle errors when creating an event', async () => {
      const error = new Error('Error');
      mockedBrevoClient.post.mockRejectedValue(error);
      (handleError as jest.Mock).mockImplementation((err) => ({
        status: 500,
        message: err.message,
      }));

      const eventOptions = {
        event_name: 'UserSignup',
        event_date: '2024-08-27',
        identifiers: { email_id: 'test@example.com' },
      };

      const result: IApiResponse = await createEvent(eventOptions);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });
});

import { initializeBrevoClient } from '../../config/brevoConfig';
import {
  getAllContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} from './brevoContactService';
import { IApiResponse } from '../../types';

jest.mock('../../config/brevoConfig');

const mockedBrevoClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

beforeEach(() => {
  (initializeBrevoClient as jest.Mock).mockReturnValue(mockedBrevoClient);
  jest.clearAllMocks();
});

describe('Contact Service', () => {
  describe('getAllContacts', () => {
    it('should retrieve all contacts successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.get.mockResolvedValue(mockResponse);

      const result: IApiResponse = await getAllContacts();

      expect(result.status).toBe(200);
      expect(result.message).toBe('Contacts retrieved successfully');
      expect(mockedBrevoClient.get).toHaveBeenCalledWith('/contacts', {
        params: { limit: undefined, offset: undefined, sort: undefined },
      });
    });

    it('should handle errors when retrieving contacts', async () => {
      mockedBrevoClient.get.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await getAllContacts();

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('createContact', () => {
    it('should create a contact successfully', async () => {
      const mockResponse = { status: 201, data: {} };
      mockedBrevoClient.post.mockResolvedValue(mockResponse);

      const result: IApiResponse = await createContact('test@example.com', { name: 'Test' }, [1], true);

      expect(result.status).toBe(201);
      expect(result.message).toBe('Contact successfully created');
      expect(mockedBrevoClient.post).toHaveBeenCalledWith('/contacts', {
        email: 'test@example.com',
        attributes: { name: 'Test' },
        listIds: [1],
        updateEnabled: true,
      });
    });

    it('should handle errors when creating a contact', async () => {
      mockedBrevoClient.post.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await createContact('test@example.com', { name: 'Test' });

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('getContactById', () => {
    it('should retrieve a contact by ID successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.get.mockResolvedValue(mockResponse);

      const result: IApiResponse = await getContactById('123');

      expect(result.status).toBe(200);
      expect(result.message).toBe('Contact details retrieved successfully');
      expect(mockedBrevoClient.get).toHaveBeenCalledWith('/contacts/123');
    });

    it('should handle errors when retrieving a contact by ID', async () => {
      mockedBrevoClient.get.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await getContactById('123');

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('updateContact', () => {
    it('should update a contact successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.put.mockResolvedValue(mockResponse);

      const result: IApiResponse = await updateContact('123', 'updated@example.com', { name: 'Updated' }, [2], false);

      expect(result.status).toBe(200);
      expect(result.message).toBe('Contact successfully updated');
      expect(mockedBrevoClient.put).toHaveBeenCalledWith('/contacts/123', {
        email: 'updated@example.com',
        attributes: { name: 'Updated' },
        listIds: [2],
        updateEnabled: false,
      });
    });

    it('should handle errors when updating a contact', async () => {
      mockedBrevoClient.put.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await updateContact('123', 'updated@example.com', { name: 'Updated' });

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('deleteContact', () => {
    it('should delete a contact successfully', async () => {
      const mockResponse = { status: 204, data: {} };
      mockedBrevoClient.delete.mockResolvedValue(mockResponse);

      const result: IApiResponse = await deleteContact('123');

      expect(result.status).toBe(204);
      expect(result.message).toBe('Contact successfully deleted');
      expect(mockedBrevoClient.delete).toHaveBeenCalledWith('/contacts/123');
    });

    it('should handle errors when deleting a contact', async () => {
      mockedBrevoClient.delete.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await deleteContact('123');

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });
});

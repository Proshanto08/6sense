import { initializeBrevoClient } from '../../config/brevoConfig';
import {
  getAllLists,
  createList,
  getList,
  updateList,
  deleteList,
  getContactsFromList,
  addContactsToList,
} from './brevoListService';
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

describe('Brevo Service', () => {
  describe('getAllLists', () => {
    it('should retrieve all lists successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.get.mockResolvedValue(mockResponse);

      const result: IApiResponse = await getAllLists();

      expect(result.status).toBe(200);
      expect(result.message).toBe('Lists retrieved successfully');
      expect(mockedBrevoClient.get).toHaveBeenCalledWith('/contacts/lists', {
        params: { limit: undefined, offset: undefined, sort: undefined },
      });
    });

    it('should handle errors when retrieving lists', async () => {
      mockedBrevoClient.get.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await getAllLists();

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('createList', () => {
    it('should create a list successfully', async () => {
      const mockResponse = { status: 201, data: {} };
      mockedBrevoClient.post.mockResolvedValue(mockResponse);

      const result: IApiResponse = await createList('Test List', 1);

      expect(result.status).toBe(201);
      expect(result.message).toBe('List successfully created');
      expect(mockedBrevoClient.post).toHaveBeenCalledWith('/contacts/lists', {
        name: 'Test List',
        folderId: 1,
      });
    });

    it('should handle errors when creating a list', async () => {
      mockedBrevoClient.post.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await createList('Test List', 1);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('getList', () => {
    it('should retrieve a list successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.get.mockResolvedValue(mockResponse);

      const result: IApiResponse = await getList(1);

      expect(result.status).toBe(200);
      expect(result.message).toBe('List details retrieved successfully');
      expect(mockedBrevoClient.get).toHaveBeenCalledWith('/contacts/lists/1');
    });

    it('should handle errors when retrieving a list', async () => {
      mockedBrevoClient.get.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await getList(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('updateList', () => {
    it('should update a list successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.put.mockResolvedValue(mockResponse);

      const result: IApiResponse = await updateList(1, 'Updated List', 2);

      expect(result.status).toBe(200);
      expect(result.message).toBe('List successfully updated');
      expect(mockedBrevoClient.put).toHaveBeenCalledWith('/contacts/lists/1', {
        name: 'Updated List',
        folderId: 2,
      });
    });

    it('should handle errors when updating a list', async () => {
      mockedBrevoClient.put.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await updateList(1, 'Updated List', 2);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('deleteList', () => {
    it('should delete a list successfully', async () => {
      const mockResponse = { status: 204, data: {} };
      mockedBrevoClient.delete.mockResolvedValue(mockResponse);

      const result: IApiResponse = await deleteList(1);

      expect(result.status).toBe(204);
      expect(result.message).toBe('List successfully deleted');
      expect(mockedBrevoClient.delete).toHaveBeenCalledWith('/contacts/lists/1');
    });

    it('should handle errors when deleting a list', async () => {
      mockedBrevoClient.delete.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await deleteList(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('getContactsFromList', () => {
    it('should retrieve contacts from a list successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.get.mockResolvedValue(mockResponse);

      const result: IApiResponse = await getContactsFromList(1);

      expect(result.status).toBe(200);
      expect(result.message).toBe('Contacts retrieved successfully');
      expect(mockedBrevoClient.get).toHaveBeenCalledWith(
        '/contacts/lists/1/contacts',
        {
          params: {
            modifiedSince: undefined,
            limit: undefined,
            offset: undefined,
            sort: undefined,
          },
        }
      );
    });

    it('should handle errors when retrieving contacts from a list', async () => {
      mockedBrevoClient.get.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await getContactsFromList(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('addContactsToList', () => {
    it('should add contacts to a list successfully', async () => {
      const mockResponse = { status: 201, data: {} };
      mockedBrevoClient.post.mockResolvedValue(mockResponse);

      const result: IApiResponse = await addContactsToList(1, ['test@example.com']);

      expect(result.status).toBe(201);
      expect(result.message).toBe('Contacts added to the list successfully');
      expect(mockedBrevoClient.post).toHaveBeenCalledWith(
        '/contacts/lists/1/contacts/add',
        {
          emails: ['test@example.com'],
        }
      );
    });

    it('should handle errors when adding contacts to a list', async () => {
      mockedBrevoClient.post.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await addContactsToList(1, ['test@example.com']);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });
});

import {
  createFolder,
  getFolders,
  getFolder,
  updateFolder,
  deleteFolder,
  getFolderLists,
} from './brevoFolderService';
import { IApiResponse } from '../../types';
import { initializeBrevoClient } from '../../config/brevoConfig';

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

describe('Folder Service', () => {
  describe('createFolder', () => {
    it('should create a folder successfully', async () => {
      const mockResponse = { status: 201, data: {} };
      mockedBrevoClient.post.mockResolvedValue(mockResponse);

      const result: IApiResponse = await createFolder('Test Folder');

      expect(result.status).toBe(201);
      expect(result.message).toBe('Folder successfully created');
      expect(mockedBrevoClient.post).toHaveBeenCalledWith('/contacts/folders', { name: 'Test Folder' });
    });

    it('should handle errors when creating a folder', async () => {
      mockedBrevoClient.post.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await createFolder('Test Folder');

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('getFolders', () => {
    it('should retrieve all folders successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.get.mockResolvedValue(mockResponse);

      const result: IApiResponse = await getFolders();

      expect(result.status).toBe(200);
      expect(result.message).toBe('Folders retrieved successfully');
      expect(mockedBrevoClient.get).toHaveBeenCalledWith('/contacts/folders', {
        params: { limit: undefined, offset: undefined, sort: undefined },
      });
    });

    it('should handle errors when retrieving folders', async () => {
      mockedBrevoClient.get.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await getFolders();

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('getFolder', () => {
    it('should retrieve a folder successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.get.mockResolvedValue(mockResponse);

      const result: IApiResponse = await getFolder(1);

      expect(result.status).toBe(200);
      expect(result.message).toBe('Folder details retrieved successfully');
      expect(mockedBrevoClient.get).toHaveBeenCalledWith('/contacts/folders/1');
    });

    it('should handle errors when retrieving a folder', async () => {
      mockedBrevoClient.get.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await getFolder(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('updateFolder', () => {
    it('should update a folder successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.put.mockResolvedValue(mockResponse);

      const result: IApiResponse = await updateFolder(1, 'Updated Folder');

      expect(result.status).toBe(200);
      expect(result.message).toBe('Folder successfully updated');
      expect(mockedBrevoClient.put).toHaveBeenCalledWith('/contacts/folders/1', { name: 'Updated Folder' });
    });

    it('should handle errors when updating a folder', async () => {
      mockedBrevoClient.put.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await updateFolder(1, 'Updated Folder');

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('deleteFolder', () => {
    it('should delete a folder successfully', async () => {
      const mockResponse = { status: 204, data: {} };
      mockedBrevoClient.delete.mockResolvedValue(mockResponse);

      const result: IApiResponse = await deleteFolder(1);

      expect(result.status).toBe(204);
      expect(result.message).toBe('Folder successfully deleted');
      expect(mockedBrevoClient.delete).toHaveBeenCalledWith('/contacts/folders/1');
    });

    it('should handle errors when deleting a folder', async () => {
      mockedBrevoClient.delete.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await deleteFolder(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });

  describe('getFolderLists', () => {
    it('should retrieve lists from a folder successfully', async () => {
      const mockResponse = { status: 200, data: {} };
      mockedBrevoClient.get.mockResolvedValue(mockResponse);

      const result: IApiResponse = await getFolderLists(1);

      expect(result.status).toBe(200);
      expect(result.message).toBe('Folder lists fetched successfully');
      expect(mockedBrevoClient.get).toHaveBeenCalledWith('/contacts/folders/1/lists', {
        params: { limit: undefined, offset: undefined, sort: undefined },
      });
    });

    it('should handle errors when retrieving lists from a folder', async () => {
      mockedBrevoClient.get.mockRejectedValue({ message: 'Error' });

      const result: IApiResponse = await getFolderLists(1);

      expect(result.status).toBe(500);
      expect(result.message).toBe('Error');
    });
  });
});

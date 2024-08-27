import handleApiRequest from '../../utils/apiUtils';
import { IApiResponse } from '../../types';
import { initializeBrevoClient } from '../../config/brevoConfig';

const apiInstance = initializeBrevoClient();

export const createFolder = async (name: string): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.post('/contacts/folders', { name })
  );
};

export const getFolders = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.get('/contacts/folders', {
      params: { limit, offset, sort },
    })
  );
};

export const getFolder = async (folderId: number): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.get(`/contacts/folders/${folderId}`)
  );
};

export const updateFolder = async (
  folderId: number,
  name: string
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.put(`/contacts/folders/${folderId}`, { name })
  );
};

export const deleteFolder = async (folderId: number): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.delete(`/contacts/folders/${folderId}`)
  );
};

export const getFolderLists = async (
  folderId: number,
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.get(`/contacts/folders/${folderId}/lists`, {
      params: { limit, offset, sort },
    })
  );
};

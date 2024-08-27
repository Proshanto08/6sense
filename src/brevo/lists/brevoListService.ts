import handleApiRequest from '../../utils/apiUtils';
import { IApiResponse } from '../../types';
import { initializeBrevoClient } from '../../config/brevoConfig';

const apiInstance = initializeBrevoClient();

export const getAllLists = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.get('/contacts/lists', {
      params: { limit, offset, sort },
    })
  );
};

export const createList = async (name: string, folderId: number): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.post('/contacts/lists', {
      name,
      folderId,
    })
  );
};

export const getList = async (listId: number): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.get(`/contacts/lists/${listId}`)
  );
};

export const updateList = async (
  listId: number,
  name: string,
  folderId: number
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.put(`/contacts/lists/${listId}`, {
      name,
      folderId,
    })
  );
};

export const deleteList = async (listId: number): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.delete(`/contacts/lists/${listId}`)
  );
};

export const getContactsFromList = async (
  listId: number,
  modifiedSince?: string,
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.get(`/contacts/lists/${listId}/contacts`, {
      params: { modifiedSince, limit, offset, sort },
    })
  );
};

export const addContactsToList = async (
  listId: number,
  emails: string[]
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.post(`/contacts/lists/${listId}/contacts/add`, {
      emails,
    })
  );
};

import handleApiRequest from '../../utils/apiUtils';
import { IApiResponse } from '../../types';
import { initializeBrevoClient } from '../../config/brevoConfig';

const apiInstance = initializeBrevoClient();

export const getAllContacts = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.get('/contacts', {
      params: { limit, offset, sort },
    })
  );
};

export const createContact = async (
  email: string,
  attributes: object,
  listIds?: number[],
  updateEnabled?: boolean
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.post('/contacts', {
      email,
      attributes,
      listIds,
      updateEnabled,
    })
  );
};

export const getContactById = async (
  identifier: string
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.get(`/contacts/${identifier}`)
  );
};

export const updateContact = async (
  identifier: string,
  email?: string,
  attributes?: object,
  listIds?: number[],
  updateEnabled?: boolean
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.put(`/contacts/${identifier}`, {
      email,
      attributes,
      listIds,
      updateEnabled,
    })
  );
};

export const deleteContact = async (
  identifier: string
): Promise<IApiResponse> => {
  return handleApiRequest(() =>
    apiInstance.delete(`/contacts/${identifier}`)
  );
};

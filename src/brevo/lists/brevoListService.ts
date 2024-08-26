import { initializeBrevoClient } from '../../config/brevoConfig';

interface IApiResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: any;
}

export const getAllLists = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get('/contacts/lists', {
      params: { limit, offset, sort },
    });
    return {
      status: response.status,
      data: response.data,
      message: 'Lists retrieved successfully',
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

export const createList = async (name: string, folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post('/contacts/lists', {
      name,
      folderId,
    });
    return {
      status: response.status,
      data: response.data,
      message: 'List successfully created',
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

export const getList = async (listId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(`/contacts/lists/${listId}`);
    return {
      status: response.status,
      data: response.data,
      message: 'List details retrieved successfully',
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

export const updateList = async (listId: number, name: string, folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.put(`/contacts/lists/${listId}`, {
      name,
      folderId,
    });
    return {
      status: response.status,
      data: {},
      message: 'List successfully updated',
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

export const deleteList = async (listId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.delete(`/contacts/lists/${listId}`);
    return {
      status: response.status,
      data: {},
      message: 'List successfully deleted',
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

export const getContactsFromList = async (
  listId: number,
  modifiedSince?: string,
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(`/contacts/lists/${listId}/contacts`, {
      params: { modifiedSince, limit, offset, sort },
    });
    return {
      status: 200,
      data: response.data,
      message: 'Contacts retrieved successfully',
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

export const addContactsToList = async (
  listId: number,
  emails: string[]
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post(`/contacts/lists/${listId}/contacts/add`, {
      emails,
    });
    return {
      status: response.status,
      data: response.data,
      message: 'Contacts added to the list successfully',
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
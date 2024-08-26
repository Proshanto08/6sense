import { initializeBrevoClient } from '../../config/brevoConfig';
import { IApiResponse } from '../../types'



export const createFolder = async (name: string): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post('/contacts/folders', { name });
    return {
      status: response.status,
      data: response.data,
      message: 'Folder successfully created',
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

export const getFolders = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get('/contacts/folders', {
      params: { limit, offset, sort },
    });
    return {
      status: response.status,
      data: response.data,
      message: 'Folders retrieved successfully',
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

export const getFolder = async (folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(`/contacts/folders/${folderId}`);
    return {
      status: response.status,
      data: response.data,
      message: 'Folder details retrieved successfully',
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

export const updateFolder = async (
  folderId: number,
  name: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.put(`/contacts/folders/${folderId}`, { name });
    return {
      status: response.status,
      data: response.data,
      message: 'Folder successfully updated',
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

export const deleteFolder = async (folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.delete(`/contacts/folders/${folderId}`);
    return {
      status: response.status,
      data: response.data,
      message: 'Folder successfully deleted',
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

export const getFolderLists = async (
  folderId: number,
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(`/contacts/folders/${folderId}/lists`, {
      params: { limit, offset, sort },
    });
    return {
      status: response.status,
      data: response.data,
      message: 'Folder lists fetched successfully',
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

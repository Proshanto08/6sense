import { initializeBrevoClient } from '../../config/brevoConfig';

interface IApiResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: any;
}

export const getAllContacts = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get('/contacts', {
      params: { limit, offset, sort },
    });
    return {
      status: response.status,
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

export const createContact = async (
  email: string,
  attributes: object,
  listIds?: number[],
  updateEnabled?: boolean
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post('/contacts', {
      email,
      attributes,
      listIds,
      updateEnabled,
    });
    return {
      status: response.status,
      data: response.data,
      message: 'Contact successfully created',
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

export const getContactById = async (
  identifier: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(`/contacts/${identifier}`);
    return {
      status: response.status,
      data: response.data,
      message: 'Contact details retrieved successfully',
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

export const updateContact = async (
  identifier: string,
  email?: string,
  attributes?: object,
  listIds?: number[],
  updateEnabled?: boolean
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.put(`/contacts/${identifier}`, {
      email,
      attributes,
      listIds,
      updateEnabled,
    });
    return {
      status: response.status,
      data: {},
      message: 'Contact successfully updated',
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

export const deleteContact = async (
  identifier: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.delete(`/contacts/${identifier}`);
    return {
      status: response.status,
      data: {},
      message: 'Contact successfully deleted',
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

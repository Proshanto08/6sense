import { IApiResponse } from '../types';

export const getHelloMessage = async (): Promise<IApiResponse> => {
  try {
   
    const response = { message: 'Hello, world!' };

    return {
      status: 200,
      data: response,
      message: response.message
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

import { IApiResponse } from '../types';

const handleApiRequest = async (
  request: () => Promise<any>
): Promise<IApiResponse> => {
  try {
    const response = await request();
    return {
      status: response.status,
      data: response.data,
      message: 'Request successful',
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

export default handleApiRequest;

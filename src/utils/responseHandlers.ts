import { IApiResponse } from "../types";

export const handleSuccess = (
  response: { status: number; data: any },
  message: string
): IApiResponse => {
  return {
    status: response.status,
    data: response.data,
    message,
  };
};

export const handleError = (
  error: any,
  errorCode?: string,
  message?: string,
  statusCode: number = 500
): IApiResponse => {
  const errorResponse = error?.response?.data || {};
  return {
    status: statusCode,
    errorCode: errorCode || errorResponse.code,
    message: message || error.message || "An error occurred",
    data: {},
  };
};

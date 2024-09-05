import { AxiosError } from "axios";
import { IApiResponse } from "../types";

export const handleSuccess = (
  response: { status: number; data: any },
  message: string,
): IApiResponse => {
  return {
    status: response.status,
    data: response.data,
    message,
  };
};

export const handleError = (
  error: Error | AxiosError,
  errorCode?: string,
  message?: string,
  statusCode = 500,
): IApiResponse => {
  let errorMessage = message || error.message || "An error occurred";
  let errorStatusCode = statusCode;
  let errorData = {};
  let errorResponseCode: string | undefined = errorCode;

  if (error instanceof AxiosError) {
    errorMessage = message || error.response?.data?.message || error.message;
    errorStatusCode = error.response?.status || statusCode;
    errorResponseCode = errorCode || error.response?.data?.code;
    errorData = error.response?.data || {};
  }

  return {
    status: errorStatusCode,
    errorCode: errorResponseCode,
    message: errorMessage,
    data: errorData,
  };
};

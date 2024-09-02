import { initializeBrevoClient } from "../config/brevoConfig";
import { IApiResponse } from "../types";
import { handleSuccess, handleError } from "./responseHandlers";

export const apiRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  successMessage: string,
  data?: object,
  params?: object
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.request({
      method,
      url,
      data,
      params,
    });
    return handleSuccess(response, successMessage);
  } catch (error) {
    return handleError(error);
  }
};

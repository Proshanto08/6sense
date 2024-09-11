import { IApiResponse } from "../types";
import { handleSuccess, handleError } from "../utils/responseHandlers";

export const getHelloMessage = async (): Promise<IApiResponse> => {
  try {
    const response = { message: "Hello, world!" };
    return handleSuccess({ status: 200, data: response }, response.message);
  } catch (error: any) {
    return handleError(error);
  }
};

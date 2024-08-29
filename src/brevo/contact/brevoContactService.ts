import { initializeBrevoClient } from "../../config/brevoConfig";
import { IApiResponse } from "../../types";
import { handleSuccess, handleError } from "../../utils/responseHandlers";

export const getAllContacts = async (
  limit?: number,
  offset?: number,
  sort?: string,
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get("/contacts", {
      params: { limit, offset, sort },
    });
    return handleSuccess(response, "Contacts retrieved successfully");
  } catch (error) {
    return handleError(error);
  }
};

export const createContact = async (
  email: string,
  attributes: object,
  listIds?: number[],
  updateEnabled?: boolean,
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post("/contacts", {
      email,
      attributes,
      listIds,
      updateEnabled,
    });
    return handleSuccess(response, "Contact successfully created");
  } catch (error) {
    return handleError(error);
  }
};

export const getContactById = async (
  identifier: string,
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(`/contacts/${identifier}`);
    return handleSuccess(response, "Contact details retrieved successfully");
  } catch (error) {
    return handleError(error);
  }
};

export const updateContact = async (
  identifier: string,
  email?: string,
  attributes?: object,
  listIds?: number[],
  updateEnabled?: boolean,
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.put(`/contacts/${identifier}`, {
      email,
      attributes,
      listIds,
      updateEnabled,
    });
    return handleSuccess(response, "Contact successfully updated");
  } catch (error) {
    return handleError(error);
  }
};

export const deleteContact = async (
  identifier: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.delete(`/contacts/${identifier}`);
    return handleSuccess(response, "Contact successfully deleted");
  } catch (error) {
    return handleError(error);
  }
};

import { initializeBrevoClient } from "../../config/brevoConfig";
import { IApiResponse } from "../../types";
import { handleSuccess, handleError } from "../../utils/responseHandlers";

export const getAllLists = async (
  limit?: number,
  offset?: number,
  sort?: string
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get("/contacts/lists", {
      params: { limit, offset, sort },
    });
    return handleSuccess(response, "Lists retrieved successfully");
  } catch (error) {
    return handleError(error);
  }
};

export const createList = async (
  name: string,
  folderId: number
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post("/contacts/lists", {
      name,
      folderId,
    });
    return handleSuccess(response, "List successfully created");
  } catch (error) {
    return handleError(error);
  }
};

export const getList = async (listId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(`/contacts/lists/${listId}`);
    return handleSuccess(response, "List details retrieved successfully");
  } catch (error) {
    return handleError(error);
  }
};

export const updateList = async (
  listId: number,
  name: string,
  folderId: number
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.put(`/contacts/lists/${listId}`, {
      name,
      folderId,
    });
    return handleSuccess(response, "List successfully updated");
  } catch (error) {
    return handleError(error);
  }
};

export const deleteList = async (listId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.delete(`/contacts/lists/${listId}`);
    return handleSuccess(response, "List successfully deleted");
  } catch (error) {
    return handleError(error);
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
    const response = await apiInstance.get(
      `/contacts/lists/${listId}/contacts`,
      {
        params: { modifiedSince, limit, offset, sort },
      }
    );
    return handleSuccess(response, "Contacts retrieved successfully");
  } catch (error) {
    return handleError(error);
  }
};

export const addContactsToList = async (
  listId: number,
  emails: string[]
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post(
      `/contacts/lists/${listId}/contacts/add`,
      {
        emails,
      }
    );
    return handleSuccess(response, "Contacts added to the list successfully");
  } catch (error) {
    return handleError(error);
  }
};

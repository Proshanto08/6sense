import { initializeBrevoClient } from "../../config/brevoConfig";
import { IApiResponse } from "../../types";
import { handleSuccess, handleError } from "../../utils/responseHandlers";

export const createFolder = async (name: string): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post("/contacts/folders", { name });
    return handleSuccess(response, "Folder successfully created");
  } catch (error) {
    return handleError(error);
  }
};

export const getFolders = async (
  limit?: number,
  offset?: number,
  sort?: string,
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get("/contacts/folders", {
      params: { limit, offset, sort },
    });
    return handleSuccess(response, "Folders retrieved successfully");
  } catch (error) {
    return handleError(error);
  }
};

export const getFolder = async (folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(`/contacts/folders/${folderId}`);
    return handleSuccess(response, "Folder details retrieved successfully");
  } catch (error) {
    return handleError(error);
  }
};

export const updateFolder = async (
  folderId: number,
  name: string,
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.put(`/contacts/folders/${folderId}`, {
      name,
    });
    return handleSuccess(response, "Folder successfully updated");
  } catch (error) {
    return handleError(error);
  }
};

export const deleteFolder = async (folderId: number): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.delete(`/contacts/folders/${folderId}`);
    return handleSuccess(response, "Folder successfully deleted");
  } catch (error) {
    return handleError(error);
  }
};

export const getFolderLists = async (
  folderId: number,
  limit?: number,
  offset?: number,
  sort?: string,
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.get(
      `/contacts/folders/${folderId}/lists`,
      {
        params: { limit, offset, sort },
      },
    );
    return handleSuccess(response, "Folder lists fetched successfully");
  } catch (error) {
    return handleError(error);
  }
};

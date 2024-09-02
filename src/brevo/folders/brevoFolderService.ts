import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";

export const createFolder = async (name: string): Promise<IApiResponse> => {
  return apiRequest(
    "post",
    "/contacts/folders",
    "Folder successfully created",
    { name },
  );
};

export const getFolders = async (
  limit?: number,
  offset?: number,
  sort?: string,
): Promise<IApiResponse> => {
  return apiRequest(
    "get",
    "/contacts/folders",
    "Folders retrieved successfully",
    undefined,
    { limit, offset, sort },
  );
};

export const getFolder = async (folderId: number): Promise<IApiResponse> => {
  return apiRequest(
    "get",
    `/contacts/folders/${folderId}`,
    "Folder details retrieved successfully",
  );
};

export const updateFolder = async (
  folderId: number,
  name: string,
): Promise<IApiResponse> => {
  return apiRequest(
    "put",
    `/contacts/folders/${folderId}`,
    "Folder successfully updated",
    { name },
  );
};

export const deleteFolder = async (folderId: number): Promise<IApiResponse> => {
  return apiRequest(
    "delete",
    `/contacts/folders/${folderId}`,
    "Folder successfully deleted",
  );
};

export const getFolderLists = async (
  folderId: number,
  limit?: number,
  offset?: number,
  sort?: string,
): Promise<IApiResponse> => {
  return apiRequest(
    "get",
    `/contacts/folders/${folderId}/lists`,
    "Folder lists fetched successfully",
    undefined,
    { limit, offset, sort },
  );
};

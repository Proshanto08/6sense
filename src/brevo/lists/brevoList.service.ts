import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";

export const getAllLists = async (
  limit?: number,
  offset?: number,
  sort?: string,
): Promise<IApiResponse> => {
  return apiRequest(
    "get",
    "/contacts/lists",
    "Lists retrieved successfully",
    undefined,
    { limit, offset, sort },
  );
};

export const createList = async (
  name: string,
  folderId: number,
): Promise<IApiResponse> => {
  return apiRequest("post", "/contacts/lists", "List successfully created", {
    name,
    folderId,
  });
};

export const getList = async (listId: number): Promise<IApiResponse> => {
  return apiRequest(
    "get",
    `/contacts/lists/${listId}`,
    "List details retrieved successfully",
  );
};

export const updateList = async (
  listId: number,
  name: string,
  folderId: number,
): Promise<IApiResponse> => {
  return apiRequest(
    "put",
    `/contacts/lists/${listId}`,
    "List successfully updated",
    { name, folderId },
  );
};

export const deleteList = async (listId: number): Promise<IApiResponse> => {
  return apiRequest(
    "delete",
    `/contacts/lists/${listId}`,
    "List successfully deleted",
  );
};

export const getContactsFromList = async (
  listId: number,
  modifiedSince?: string,
  limit?: number,
  offset?: number,
  sort?: string,
): Promise<IApiResponse> => {
  return apiRequest(
    "get",
    `/contacts/lists/${listId}/contacts`,
    "Contacts retrieved successfully",
    undefined,
    { modifiedSince, limit, offset, sort },
  );
};

export const addContactsToList = async (
  listId: number,
  emails: string[],
): Promise<IApiResponse> => {
  return apiRequest(
    "post",
    `/contacts/lists/${listId}/contacts/add`,
    "Contacts added to the list successfully",
    { emails },
  );
};

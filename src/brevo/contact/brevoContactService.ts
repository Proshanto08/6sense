import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";

export const getAllContacts = async (
  limit?: number,
  offset?: number,
  sort?: string,
): Promise<IApiResponse> => {
  return apiRequest(
    "get",
    "/contacts",
    "Contacts retrieved successfully",
    undefined,
    { limit, offset, sort },
  );
};

export const createContact = async (
  email: string,
  attributes: object,
  listIds?: number[],
  updateEnabled?: boolean,
): Promise<IApiResponse> => {
  return apiRequest("post", "/contacts", "Contact successfully created", {
    email,
    attributes,
    listIds,
    updateEnabled,
  });
};

export const getContactById = async (
  identifier: string,
): Promise<IApiResponse> => {
  return apiRequest(
    "get",
    `/contacts/${identifier}`,
    "Contact details retrieved successfully",
  );
};

export const updateContact = async (
  identifier: string,
  email?: string,
  attributes?: object,
  listIds?: number[],
  updateEnabled?: boolean,
): Promise<IApiResponse> => {
  return apiRequest(
    "put",
    `/contacts/${identifier}`,
    "Contact successfully updated",
    { email, attributes, listIds, updateEnabled },
  );
};

export const deleteContact = async (
  identifier: string,
): Promise<IApiResponse> => {
  return apiRequest(
    "delete",
    `/contacts/${identifier}`,
    "Contact successfully deleted",
  );
};

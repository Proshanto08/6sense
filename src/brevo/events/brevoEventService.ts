import { initializeBrevoClient } from "../../config/brevoConfig";
import { IApiResponse } from "../../types";
import { handleSuccess, handleError } from "../../utils/responseHandlers";

interface IIdentifiers {
  email_id?: string;
}

interface IContactProperties {
  [key: string]: any;
}

interface IEventProperties {
  [key: string]: any;
}

interface ICreateEventOptions {
  event_name: string;
  event_date?: string;
  identifiers: IIdentifiers;
  contact_properties?: IContactProperties;
  event_properties?: IEventProperties;
}

export const createEvent = async (
  eventOptions: ICreateEventOptions,
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post("/events", eventOptions);
    return handleSuccess(response, "Event created successfully");
  } catch (error) {
    return handleError(error);
  }
};

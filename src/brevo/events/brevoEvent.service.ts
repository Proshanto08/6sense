import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";
import { sendContactEmail } from "../email/brevoEmail.service";
import { v4 as uuidv4 } from "uuid";
import { handleError, handleSuccess } from "../../utils/responseHandlers";
import { AxiosError } from "axios";

interface IIdentifiers {
  email_id?: string;
}

interface IContactProperties {
  name: string;
  email: string;
  consent: boolean;
  [key: string]: any;
}

interface IEventProperties {
  [key: string]: any;
}

interface ICreateEventOptions {
  event_name: string;
  identifiers: IIdentifiers;
  contact_properties?: IContactProperties;
  event_properties?: IEventProperties;
}

export const createEvent = async (
  eventOptions: ICreateEventOptions,
): Promise<IApiResponse> => {
  return apiRequest(
    "post",
    "/events",
    "Event created successfully",
    eventOptions,
  );
};

export const handleCreateEventByBrevo = async (
  event_name: string,
  contact_properties: IContactProperties | Partial<IContactProperties> = {},
  event_properties: IEventProperties,
  cookies: { anonymousEmailId?: string },
): Promise<IApiResponse> => {
  const {
    name = "",
    email = "",
    consent = false,
  } = contact_properties as IContactProperties;

  let email_id: string | undefined = cookies.anonymousEmailId;

  if (!email_id) {
    email_id = `anon_${uuidv4()}@example.com`;
  }

  const isAnonymousEmail = email_id.startsWith("anon_");

  if (!isAnonymousEmail) {
    contact_properties.email = email_id;
  }

  if (event_name === "contact_form_submission" && email) {
    await sendContactEmail(contact_properties as IContactProperties);
  }

  const eventOptions: ICreateEventOptions = {
    event_name,
    identifiers: { email_id },
    contact_properties: {
      name,
      email,
      consent,
      ...contact_properties,
    },
    event_properties,
  };

  try {
    const result = await createEvent(eventOptions);

    if (result.status !== 200 && result.status !== 204) {
      return handleError(
        result.data,
        result.errorCode,
        result.message,
        result.status,
      );
    }

    if (event_name === "contact_form_submission") {
      if (!result.data && result.status === 204) {
        return handleSuccess(
          { status: 200, data: { email_id: contact_properties.email } },
          "Event created successfully",
        );
      }
    }

    if (!result.data && result.status === 204) {
      return handleSuccess(
        { status: 200, data: { email_id } },
        "Event created successfully",
      );
    }

    return handleSuccess({ status: 200, data: { email_id } }, result.message);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

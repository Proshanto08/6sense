import axios, { AxiosError } from "axios";
import { mixpanelConfig } from "../config/mixpanelConfig";
import { IApiResponse } from "../types";
import { handleSuccess, handleError } from "../utils/responseHandlers";
import { v4 as uuidv4 } from "uuid";

interface IEventProperties {
  [key: string]: any;
}

export const updateUserProfile = async (
  distinctId: string,
  properties: IEventProperties,
): Promise<IApiResponse> => {
  const { peopleApiUrl, projectToken } = mixpanelConfig;
  const { name, email, companyWebsite } = properties;

  try {
    const response = await axios.post(peopleApiUrl, null, {
      params: {
        data: JSON.stringify({
          $token: projectToken,
          $distinct_id: distinctId,
          $set: {
            $name: name,
            $email: email,
            $company_website: companyWebsite,
          },
        }),
      },
    });

    return handleSuccess(response, "User profile updated successfully");
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export const identifyUser = async (
  userId: string,
  anonId: string,
): Promise<IApiResponse> => {
  const { apiUrl, projectToken } = mixpanelConfig;

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        data: JSON.stringify({
          event: "$identify",
          properties: {
            $distinct_id: userId,
            $anon_id: anonId,
            token: projectToken,
          },
        }),
      },
    });

    return handleSuccess(response, "User identified successfully");
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export const trackUserEvent = async (
  distinctId: string,
  event_name: string,
  properties: IEventProperties,
): Promise<IApiResponse> => {
  const { apiUrl, projectToken } = mixpanelConfig;

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        data: JSON.stringify({
          event: event_name,
          properties: {
            distinct_id: distinctId,
            token: projectToken,
            ...properties,
          },
        }),
      },
    });

    return handleSuccess(response, "Event tracked successfully");
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export const createAlias = async (
  distinctId: string,
  aliasId: string,
): Promise<IApiResponse> => {
  const { apiUrl, projectToken } = mixpanelConfig;

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        data: JSON.stringify({
          event: "$create_alias",
          properties: {
            distinct_id: distinctId,
            alias: aliasId,
            token: projectToken,
          },
        }),
      },
    });

    return handleSuccess(response, "Alias created successfully");
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export const mergeIdentities = async (
  anonId: string,
  identifiedId: string,
): Promise<IApiResponse> => {
  const { importApiUrl, projectToken, apiSecretToken } = mixpanelConfig;

  try {
    const response = await axios.post(importApiUrl, null, {
      params: {
        data: JSON.stringify({
          event: "$merge",
          properties: {
            $distinct_ids: [anonId, identifiedId],
          },
          token: projectToken,
        }),
      },
      auth: {
        username: projectToken,
        password: apiSecretToken,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return handleSuccess(response, "Identities merged successfully");
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export const handleTrackEvent = async (
  eventName: string,
  contactProperties: IEventProperties,
  eventProperties: IEventProperties,
  cookies: { distinctId?: string },
): Promise<IApiResponse> => {
  const email = contactProperties?.email;
  const distinctId = email || cookies.distinctId || uuidv4();
  let response: IApiResponse;

  if (email) {
    const previousDistinctId = cookies.distinctId;

    response = await updateUserProfile(distinctId, contactProperties);
    if (response.status !== 200) {
      return response;
    }

    if (previousDistinctId) {
      response = await mergeIdentities(previousDistinctId, distinctId);
      if (response.status !== 200) {
        return response;
      }
    }
  }

  response = await trackUserEvent(distinctId, eventName, eventProperties);
  if (response.status !== 200) {
    return response;
  }

  return {
    status: 200,
    message: "Event tracked successfully in Mixpanel",
    data: { distinctId },
  };
};

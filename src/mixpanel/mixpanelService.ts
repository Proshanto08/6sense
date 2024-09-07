import axios, { AxiosError } from "axios";
import { mixpanelConfig } from "../config/mixpanelConfig";
import { IApiResponse } from "../types";
import { handleSuccess, handleError } from "../utils/responseHandlers";
import { v4 as uuidv4 } from "uuid";

interface IEventProperties {
  [key: string]: any;
}

const { peopleApiUrl, apiUrl, importApiUrl, projectToken, apiSecretToken } =
  mixpanelConfig;

const postToMixpanel = async (
  url: string,
  data: any,
  auth?: { username: string; password: string },
  headers?: { [key: string]: string },
): Promise<IApiResponse> => {
  try {
    const response = await axios.post(url, null, {
      params: { data: JSON.stringify(data) },
      auth,
      headers,
    });

    return handleSuccess(response, "Request successful");
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

export const updateUserProfile = async (
  distinctId: string,
  properties: IEventProperties,
): Promise<IApiResponse> => {
  const data = {
    $token: projectToken,
    $distinct_id: distinctId,
    $set: properties,
  };

  return postToMixpanel(peopleApiUrl, data);
};

export const identifyUser = async (
  userId: string,
  anonId: string,
): Promise<IApiResponse> => {
  const data = {
    event: "$identify",
    properties: {
      $distinct_id: userId,
      $anon_id: anonId,
      token: projectToken,
    },
  };

  return postToMixpanel(apiUrl, data);
};

export const trackUserEvent = async (
  distinctId: string,
  event_name: string,
  properties: IEventProperties,
): Promise<IApiResponse> => {
  const data = {
    event: event_name,
    properties: {
      distinct_id: distinctId,
      token: projectToken,
      ...properties,
    },
  };

  return postToMixpanel(apiUrl, data);
};

export const createAlias = async (
  distinctId: string,
  aliasId: string,
): Promise<IApiResponse> => {
  const data = {
    event: "$create_alias",
    properties: {
      distinct_id: distinctId,
      alias: aliasId,
      token: projectToken,
    },
  };

  return postToMixpanel(apiUrl, data);
};

export const mergeIdentities = async (
  anonId: string,
  identifiedId: string,
): Promise<IApiResponse> => {
  const data = {
    event: "$merge",
    properties: {
      $distinct_ids: [anonId, identifiedId],
    },
    token: projectToken,
  };

  return postToMixpanel(
    importApiUrl,
    data,
    {
      username: projectToken,
      password: apiSecretToken,
    },
    {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  );
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

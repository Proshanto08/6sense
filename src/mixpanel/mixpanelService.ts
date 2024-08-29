import axios from "axios";
import { mixpanelConfig } from "../config/mixpanelConfig";
import { IApiResponse } from "../types";
import { handleSuccess, handleError } from "../utils/responseHandlers";

interface IEventProperties {
  [key: string]: any;
}

export const updateUserProfile = async (
  distinctId: string,
  properties: IEventProperties,
): Promise<IApiResponse> => {
  const { peopleApiUrl, projectToken } = mixpanelConfig;

  const { FIRSTNAME, LASTNAME, email_id } = properties;
  const name = `${FIRSTNAME || ""} ${LASTNAME || ""}`.trim();

  try {
    const response = await axios.post(peopleApiUrl, null, {
      params: {
        data: JSON.stringify({
          $token: projectToken,
          $distinct_id: distinctId,
          $set: {
            $name: name,
            $email: email_id,
            ...properties,
          },
        }),
      },
    });

    return handleSuccess(response, "User profile updated successfully");
  } catch (error) {
    return handleError(error);
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
    return handleError(error);
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
    return handleError(error);
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
    return handleError(error);
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
    return handleError(error);
  }
};

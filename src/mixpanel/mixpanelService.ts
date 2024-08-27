import axios from 'axios';
import { mixpanelConfig } from '../config/mixpanelConfig';

interface IApiResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: any;
}

interface EventProperties {
  [key: string]: any;
}

export const updateUserProfile = async (distinctId: string, properties: EventProperties): Promise<IApiResponse> => {
  const { peopleApiUrl, projectToken } = mixpanelConfig;

  try {
    const response = await axios.post(peopleApiUrl, null, {
      params: {
        data: JSON.stringify({
          $token: projectToken,
          $distinct_id: distinctId,
          $set: properties,
        }),
      },
    });

    return {
      status: response.status,
      data: response.data,
      message: 'User profile updated successfully',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.errorCode,
      message: errorResponse.message || 'Error updating user profile',
      data: {},
    };
  }
};

export const identifyUser = async (userId: string, anonId: string): Promise<IApiResponse> => {
  const { apiUrl, projectToken } = mixpanelConfig;

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        data: JSON.stringify({
          event: '$identify',
          properties: {
            $distinct_id: userId,
            $anon_id: anonId,
            token: projectToken,
          },
        }),
      },
    });

    return {
      status: response.status,
      data: response.data,
      message: 'User identified successfully',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.errorCode,
      message: errorResponse.message || 'Error identifying user',
      data: {},
    };
  }
};

export const trackUserEvent = async (distinctId: string, eventName: string, properties: EventProperties): Promise<IApiResponse> => {
  const { apiUrl, projectToken } = mixpanelConfig;

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        data: JSON.stringify({
          event: eventName,
          properties: {
            distinct_id: distinctId,
            token: projectToken,
            ...properties,
          },
        }),
      },
    });

    return {
      status: response.status,
      data: response.data,
      message: 'Event tracked successfully',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.errorCode,
      message: errorResponse.message || 'Error tracking user event',
      data: {},
    };
  }
};

export const createAlias = async (distinctId: string, aliasId: string): Promise<IApiResponse> => {
  const { apiUrl, projectToken } = mixpanelConfig;

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        data: JSON.stringify({
          event: '$create_alias',
          properties: {
            distinct_id: distinctId,
            alias: aliasId,
            token: projectToken,
          },
        }),
      },
    });

    return {
      status: response.status,
      data: response.data,
      message: 'Alias created successfully',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.errorCode,
      message: errorResponse.message || 'Error creating alias in Mixpanel',
      data: {},
    };
  }
};

export const mergeIdentities = async (anonId: string, identifiedId: string): Promise<IApiResponse> => {
  const { importApiUrl, projectToken, apiSecretToken } = mixpanelConfig;

  try {
    const response = await axios.post(importApiUrl, null, {
      params: {
        data: JSON.stringify({
          event: '$merge',
          properties: {
            $distinct_ids: [anonId, identifiedId],
          },
          token: projectToken,
        }),
      },
      auth: {
        username: projectToken,
        password: apiSecretToken
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      status: response.status,
      data: response.data,
      message: 'Identities merged successfully',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.errorCode,
      message: errorResponse.message || 'Error merging identities in Mixpanel',
      data: {},
    };
  }
};

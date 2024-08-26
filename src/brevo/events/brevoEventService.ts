import { initializeBrevoClient } from '../../config/brevoConfig';

interface IApiResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: any;
}

interface Identifiers {
  email_id?: string;
  ext_id?: string;
}

interface ContactProperties {
  [key: string]: any;
}

interface EventProperties {
  [key: string]: any;
}

interface CreateEventOptions {
  event_name: string;
  event_date?: string;
  identifiers: Identifiers;
  contact_properties?: ContactProperties;
  event_properties?: EventProperties;
}

export const createEvent = async (eventOptions: CreateEventOptions): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post('/events', eventOptions);
    return {
      status: response.status,
      data: response.data,
      message: 'Event created successfully',
    };
  } catch (error: any) {
    const errorResponse = error.response?.data || {};
    return {
      status: error.response?.status || 500,
      errorCode: errorResponse.errorCode,
      message: errorResponse.message || 'An error occurred',
      data: {},
    };
  }
};




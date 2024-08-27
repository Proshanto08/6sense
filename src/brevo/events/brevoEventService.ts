import { initializeBrevoClient } from '../../config/brevoConfig';

interface IApiResponse {
  status: number;
  errorCode?: string;
  message?: string;
  data: any;
}

interface IIdentifiers {
  email_id?: string;
  ext_id?: string;
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

export const createEvent = async (eventOptions: ICreateEventOptions): Promise<IApiResponse> => {
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

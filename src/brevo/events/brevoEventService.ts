import { initializeBrevoClient } from '../../config/brevoConfig';
import { IApiResponse } from '../../types';
import { handleSuccess, handleError } from '../../utils/responseHandlers';

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

export const createEvent = async (
  eventOptions: CreateEventOptions
): Promise<IApiResponse> => {
  const apiInstance = initializeBrevoClient();

  try {
    const response = await apiInstance.post('/events', eventOptions);
    return handleSuccess(response, 'Event created successfully');
  } catch (error) {
    return handleError(error);
  }
};

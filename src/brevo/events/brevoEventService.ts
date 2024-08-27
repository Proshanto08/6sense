import handleApiRequest from '../../utils/apiUtils';
import { IApiResponse } from '../../types';
import { initializeBrevoClient } from '../../config/brevoConfig';

const apiInstance = initializeBrevoClient();

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
  return handleApiRequest(() =>
    apiInstance.post('/events', eventOptions)
  );
};

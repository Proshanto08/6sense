import dotenv from 'dotenv';

dotenv.config();

interface IMixpanelConfig {
  projectToken: string;
  apiUrl: string;
  peopleApiUrl: string;
  importApiUrl: string;
  apiSecretToken:string;
}

const getMixpanelConfig = (): IMixpanelConfig => {
  const { MIXPANEL_PROJECT_TOKEN, MIXPANEL_API_URL, MIXPANEL_PEOPLE_API_URL, MIXPANEL_IMPORT_API_URL,MIXPANEL_API_SECRET } = process.env;

  if (!MIXPANEL_PROJECT_TOKEN || !MIXPANEL_API_URL || !MIXPANEL_PEOPLE_API_URL || !MIXPANEL_IMPORT_API_URL || !MIXPANEL_API_SECRET) {
    throw new Error('Missing required environment variables for Mixpanel');
  }

  return {
    projectToken: MIXPANEL_PROJECT_TOKEN,
    apiUrl: MIXPANEL_API_URL,
    peopleApiUrl: MIXPANEL_PEOPLE_API_URL,
    importApiUrl: MIXPANEL_IMPORT_API_URL,
    apiSecretToken: MIXPANEL_API_SECRET
  };
};

export const mixpanelConfig = getMixpanelConfig();

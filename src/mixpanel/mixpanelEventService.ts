import axios from 'axios';
import { mixpanelConfig } from '../config/mixpanelConfig';

interface IEventProperties {
    [key: string]: any;
}

interface IApiResponse {
    status: number;
    errorCode?: string;
    message?: string;
    data?: any;
}

export const trackEvent = async (eventName: string, properties: IEventProperties): Promise<IApiResponse> => {
    const data = new URLSearchParams({
        data: JSON.stringify({
            event: eventName,
            properties: {
                ...properties,
                token: mixpanelConfig.projectToken,
            },
        }),
    }).toString();

    try {
        const response = await axios.post(mixpanelConfig.apiUrl, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return { 
            status: response.status, 
            data: response.data, 
            message: 'Event tracked successfully' 
        };
    } catch (error: any) {
        const errorResponse = error.response?.data || {};
        return {
            status: error.response?.status || 500,
            errorCode: errorResponse.code,
            message: errorResponse.message || 'Failed to track event',
            data: {},
        };
    }
};

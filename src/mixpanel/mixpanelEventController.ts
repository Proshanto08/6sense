import { Request, Response } from 'express';
import { trackEvent } from './mixpanelEventService';

export const trackEventController = async (req: Request, res: Response): Promise<void> => {
    const { eventName, properties } = req.body;

    if (!eventName || !properties) {
        res.status(400).json({ status: 400, message: 'Event name and properties are required.' });
        return;
    }

    const result = await trackEvent(eventName, properties);
    res.status(result.status).json(result);
};

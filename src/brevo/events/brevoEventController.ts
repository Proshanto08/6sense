import { Request, Response } from 'express';
import { createEvent } from './brevoEventService';

export const handleCreateEvent = async (req: Request, res: Response): Promise<void> => {
  const { event_name, event_date, identifiers, contact_properties, event_properties } = req.body;

  if (!event_name || !identifiers) {
    res.status(400).json({ status: 400, message: 'Event name and identifiers are required' });
    return;
  }

  const eventOptions = {
    event_name,
    event_date,
    identifiers,
    contact_properties,
    event_properties,
  };

  const result = await createEvent(eventOptions);
  res.status(result.status).json(result);
};

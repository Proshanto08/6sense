import { Request, Response } from 'express';
import { createEvent } from './brevoEventService';

export const handleCreateEvent = async (req: Request, res: Response): Promise<void> => {
  const { event_name, event_date, identifiers, contact_properties, event_properties } = req.body;

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

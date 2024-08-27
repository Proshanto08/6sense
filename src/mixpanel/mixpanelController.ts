import { Request, Response } from 'express';
import { updateUserProfile, trackUserEvent, createAlias } from './mixpanelService';
import { v4 as uuidv4 } from 'uuid';

export const handleTrackEvent = async (req: Request, res: Response): Promise<void> => {
  const { eventName, properties } = req.body;
  const email = properties.email;
  const distinctId = email || req.cookies.distinctId || uuidv4();

  if (email) {
    const previousDistinctId = req.cookies.distinctId;

    const updateProfileResponse = await updateUserProfile(distinctId, properties);
    if (updateProfileResponse.status !== 200) {
      res.status(updateProfileResponse.status).json(updateProfileResponse);
      return;
    }

    if (previousDistinctId) {
      const aliasResponse = await createAlias(previousDistinctId, distinctId);
      if (aliasResponse.status !== 200) {
        res.status(aliasResponse.status).json(aliasResponse);
        return;
      }
    }
  }

  const trackEventResponse = await trackUserEvent(distinctId, eventName, properties);
  if (trackEventResponse.status !== 200) {
    res.status(trackEventResponse.status).json(trackEventResponse);
    return;
  }

  res.cookie('distinctId', distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000 });
  res.status(200).json({
    status: 200,
    message: 'Event tracked successfully',
  });
};

export const handleClearDistinctId = (req: Request, res: Response): void => {
  res.cookie('distinctId', '', { maxAge: 0, httpOnly: true });
  res.status(200).json({
    status: 200,
    message: 'Distinct ID cookie cleared successfully',
  });
};

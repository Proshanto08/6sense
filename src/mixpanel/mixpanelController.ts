import { Request, Response } from 'express';
import { updateUserProfile, trackUserEvent, createAlias } from './mixpanelService';
import { v4 as uuidv4 } from 'uuid';

export const handleTrackEvent = async (req: Request, res: Response): Promise<void> => {
  const { eventName, properties } = req.body;
  const email = properties.email;
  const distinctId = email || req.cookies.distinctId || uuidv4();

  if (!eventName) {
    res.status(400).json({
      status: 400,
      message: 'Event name is required',
    });
    return;
  }

  try {
    if (email) {
      const previousDistinctId = req.cookies.distinctId;

      // Update user profile
      const updateProfileResponse = await updateUserProfile(distinctId, properties);

      // Check if profile update was successful
      if (updateProfileResponse.status !== 200) {
        res.status(updateProfileResponse.status).json(updateProfileResponse);
        return;
      }

      // Create alias if there's a previous distinct ID
      if (previousDistinctId) {
        const createAliasResponse = await createAlias(previousDistinctId, distinctId);

        // Check if alias creation was successful
        if (createAliasResponse.status !== 200) {
          res.status(createAliasResponse.status).json(createAliasResponse);
          return;
        }
      }
    }

    // Track the user event
    const trackEventResponse = await trackUserEvent(distinctId, eventName, properties);

    // Check if event tracking was successful
    if (trackEventResponse.status !== 200) {
      res.status(trackEventResponse.status).json(trackEventResponse);
      return;
    }

    // Set or update distinct ID cookie
    res.cookie('distinctId', distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000 });
    res.status(200).json({
      status: 200,
      message: 'Event tracked successfully',
    });
  } catch (error: any) {
    console.error('Error processing event:', error);
    res.status(500).json({
      status: 500,
      errorCode: error.response?.status || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Error processing event',
    });
  }
};

export const handleClearDistinctId = (req: Request, res: Response): void => {
  try {
    res.cookie('distinctId', '', { maxAge: 0, httpOnly: true });
    res.status(200).json({
      status: 200,
      message: 'Distinct ID cookie cleared successfully',
    });
  } catch (error: any) {
    console.error('Error clearing distinct ID cookie:', error);
    res.status(500).json({
      status: 500,
      errorCode: error.response?.status || 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Error clearing distinct ID cookie',
    });
  }
};

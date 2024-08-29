import { Request, Response } from "express";
import {
  updateUserProfile,
  trackUserEvent,
  createAlias,
} from "./mixpanelService";
import { v4 as uuidv4 } from "uuid";

export const handleTrackEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    event_name: eventName,
    identifiers,
    contact_properties: contactProperties,
    event_properties: eventProperties,
  } = req.body;

  const email = identifiers?.email_id;
  const distinctId = email || req.cookies.distinctId || uuidv4();

  if (email) {
    const previousDistinctId = req.cookies.distinctId;

    try {
      const updateProfileResponse = await updateUserProfile(
        distinctId,
        contactProperties
      );
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
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
  try {
    const trackEventResponse = await trackUserEvent(
      distinctId,
      eventName,
      eventProperties,
    );
    if (trackEventResponse.status !== 200) {
      res.status(trackEventResponse.status).json(trackEventResponse);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }

  res.cookie("distinctId", distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000 });
  res.status(200).json({
    status: 200,
    message: "Event tracked successfully",
  });
};

export const handleClearDistinctId = (req: Request, res: Response): void => {
  res.cookie("distinctId", "", { maxAge: 0, httpOnly: true });
  res.cookie("anonymousEmailId", "", { maxAge: 0, httpOnly: true });
  res.status(200).json({
    status: 200,
    message: "Distinct ID cookie cleared successfully",
  });
};

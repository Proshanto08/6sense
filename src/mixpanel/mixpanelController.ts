import { Request, Response } from "express";
import { updateUserProfile, trackUserEvent, createAlias } from "./mixpanelService";
import { v4 as uuidv4 } from "uuid";

export const handleTrackEventByMixpanel = async (
  req: Request,
  res: Response,
): Promise<{ status: number; message: string } | void> => {
  const {
    event_name: eventName,
    contact_properties: contactProperties,
    event_properties: eventProperties,
  } = req.body;

  const email = contactProperties?.email;
  const distinctId = email || req.cookies.distinctId || uuidv4();

  if (email) {
    const previousDistinctId = req.cookies.distinctId;

    try {
      const updateProfileResponse = await updateUserProfile(distinctId, contactProperties);
      if (updateProfileResponse.status !== 200) {
        return { status: updateProfileResponse.status, message: "Failed to update profile in Mixpanel" };
      }

      if (previousDistinctId) {
        const aliasResponse = await createAlias(previousDistinctId, distinctId);
        if (aliasResponse.status !== 200) {
          return { status: aliasResponse.status, message: "Failed to create alias in Mixpanel" };
        }
      }
    } catch (error) {
      return { status: 500, message: "Internal server error in Mixpanel" };
    }
  }

  try {
    const trackEventResponse = await trackUserEvent(distinctId, eventName, eventProperties);
    if (trackEventResponse.status !== 200) {
      return { status: trackEventResponse.status, message: "Failed to track event in Mixpanel" };
    }
  } catch (error) {
    return { status: 500, message: "Internal server error in Mixpanel" };
  }
  res.cookie("distinctId", distinctId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });

  return { status: 200, message: "Event tracked successfully in Mixpanel" };
};



export const handleClearDistinctId = (req: Request, res: Response): void => {
  res.cookie("distinctId", "", { maxAge: 0, httpOnly: true });
  res.cookie("anonymousEmailId", "", { maxAge: 0, httpOnly: true });
  res.status(200).json({
    status: 200,
    message: "Distinct ID cookie cleared successfully",
  });
};

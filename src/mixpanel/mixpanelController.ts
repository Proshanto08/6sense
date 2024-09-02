import { Request, Response } from "express";
import { handleTrackEvent } from "./mixpanelService";

export const handleTrackEventByMixpanel = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    event_name: eventName,
    contact_properties: contactProperties,
    event_properties: eventProperties,
  } = req.body;

  const response = await handleTrackEvent(
    eventName,
    contactProperties,
    eventProperties,
    req.cookies,
  );

  if (response.data && response.data.distinctId) {
    res.cookie("distinctId", response.data.distinctId, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  res.status(response.status).json({
    status: response.status,
    message: response.message,
    ...response.data,
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

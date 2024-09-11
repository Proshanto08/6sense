import { Request, Response } from "express";
import { handleCreateEventByBrevo } from "../brevo/events/brevoEvent.service";
import { handleTrackEvent } from "../mixpanel/mixpanel.service";
import { IApiResponse } from "../types";

export const handleEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { event_name, contact_properties = {}, event_properties } = req.body;

  try {
    const brevoResponse: IApiResponse = await handleCreateEventByBrevo(
      event_name,
      contact_properties,
      event_properties,
      req.cookies,
    );

    if (brevoResponse.status !== 200) {
      res.status(brevoResponse.status).json({
        status: brevoResponse.status,
        message: brevoResponse.message,
        errorCode: brevoResponse.errorCode,
        ...brevoResponse.data,
      });
      return;
    }

    if (brevoResponse.data && brevoResponse.data.email_id) {
      res.cookie("anonymousEmailId", brevoResponse.data.email_id, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    }

    const mixpanelResponse: IApiResponse = await handleTrackEvent(
      event_name,
      contact_properties,
      event_properties,
      req.cookies,
    );

    if (mixpanelResponse.status !== 200) {
      res.status(mixpanelResponse.status).json({
        status: mixpanelResponse.status,
        message: mixpanelResponse.message,
        errorCode: mixpanelResponse.errorCode,
        ...mixpanelResponse.data,
      });
      return;
    }

    if (mixpanelResponse.data && mixpanelResponse.data.distinctId) {
      res.cookie("distinctId", mixpanelResponse.data.distinctId, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    }

    res.status(200).json({
      brevo: {
        status: brevoResponse.status,
        message: brevoResponse.message,
        ...brevoResponse.data,
      },
      mixpanel: {
        status: mixpanelResponse.status,
        message: mixpanelResponse.message,
        ...mixpanelResponse.data,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error handling event in both Brevo and Mixpanel",
    });
  }
};

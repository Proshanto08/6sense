import { Request, Response } from "express";
import { handleCreateEventByBrevo } from "./brevoEvent.service";

export const handleCreateEventByBrevoController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { event_name, contact_properties = {}, event_properties } = req.body;

  const result = await handleCreateEventByBrevo(
    event_name,
    contact_properties,
    event_properties,
    req.cookies,
  );

  if (result.data && result.data.email_id) {
    res.cookie("anonymousEmailId", result.data.email_id, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  res.status(result.status).json(result);
};

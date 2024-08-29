import { Request, Response } from "express";
import { createEvent } from "./brevoEventService";
import { SendContactEmail } from "../email/brevoEmailService";
import { v4 as uuidv4 } from "uuid";

export const handleCreateEvent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    event_name,
    event_date,
    contact_properties = {},
    event_properties,
  } = req.body;

  let email_id: string | undefined;
  let anonymousEmailId = req.cookies.anonymousEmailId;

  if (!anonymousEmailId) {
    anonymousEmailId = `anon_${uuidv4()}@example.com`;
    res.cookie("anonymousEmailId", anonymousEmailId, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  email_id = anonymousEmailId;

  const updatedContactProperties = { ...contact_properties };
  if (contact_properties?.name) {
    const [firstName, ...lastNameParts] = contact_properties.name.split(" ");
    const lastName = lastNameParts.join(" ");
    updatedContactProperties.FIRSTNAME = firstName;
    updatedContactProperties.LASTNAME = lastName;
  }

  const eventOptions = {
    event_name,
    event_date,
    identifiers: {
      email_id,
    },
    contact_properties: updatedContactProperties,
    event_properties,
  };

  try {
    const result = await createEvent(eventOptions);
    if (
      event_name === "contact_form_submission" &&
      updatedContactProperties.email
    ) {
      email_id = updatedContactProperties.email;
      res.cookie("anonymousEmailId", email_id, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      const emailResult = await SendContactEmail(updatedContactProperties);
      res.status(emailResult.status).json(emailResult);
      return;
    }

    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error handling event", error });
  }
};

import { Request, Response } from "express";
import { createEvent } from "./brevoEventService";
import { SendContactEmail } from "../email/brevoEmailService";
import { v4 as uuidv4 } from "uuid";

export const handleCreateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    event_name,
    event_date,
    contact_properties = {},
    event_properties,
  } = req.body;

  let email_id: string | undefined;

  // Check for an existing anonymous ID in cookies
  let anonymousEmailId = req.cookies.anonymousEmailId;

  if (!anonymousEmailId) {
    // Generate a new anonymous ID if it doesn't exist in cookies
    anonymousEmailId = `anon_${uuidv4()}@example.com`;
    res.cookie("anonymousEmailId", anonymousEmailId, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  // Use the anonymous ID as the email_id
  email_id = anonymousEmailId;

  // Modify contact_properties to include FIRSTNAME and LASTNAME if name exists
  const updatedContactProperties = { ...contact_properties };
  if (contact_properties?.name) {
    const [firstName, ...lastNameParts] = contact_properties.name.split(" ");
    const lastName = lastNameParts.join(" ");
    updatedContactProperties.FIRSTNAME = firstName;
    updatedContactProperties.LASTNAME = lastName;
  }

  // Construct the event options
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
    // Call Brevo's createEvent function
    const result = await createEvent(eventOptions);

    // Check if the event is 'contact_form_submission' and update the email ID if provided
    if (
      event_name === "contact_form_submission" &&
      updatedContactProperties.email
    ) {
      // Set the email_id to the real email from contact_properties
      email_id = updatedContactProperties.email;
      // Update the cookie to store the real email
      res.cookie("anonymousEmailId", email_id, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // Send an email using the updated contact properties
      const emailResult = await SendContactEmail(updatedContactProperties);
      res.status(emailResult.status).json(emailResult);
      return;
    }

    // Return the response from the event creation
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error handling event", error });
  }
};

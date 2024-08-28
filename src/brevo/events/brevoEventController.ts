import { Request, Response } from 'express';
import { createEvent } from './brevoEventService';
import { prepareAndSendContactEmail } from '../email/brevoEmailService';
import { v4 as uuidv4 } from 'uuid';

export const handleCreateEvent = async (req: Request, res: Response): Promise<void> => {
  const { event_name, event_date, identifiers, contact_properties, event_properties } = req.body;

  // Generate or retrieve the identifier
  let email_id: string | undefined;
  let ext_id: string | undefined;

  // Check for an existing anonymous ID in cookies
  let anonymousEmailId = req.cookies.anonymousEmailId;

  if (!anonymousEmailId) {
    // Generate a new anonymous ID if it doesn't exist in cookies
    anonymousEmailId = `anon_${uuidv4()}@example.com`;
    res.cookie('anonymousEmailId', anonymousEmailId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });
  }

  // Use the anonymous ID as the email_id
  email_id = anonymousEmailId;

  // Modify contact_properties to include FIRSTNAME and LASTNAME
  const updatedContactProperties = { ...contact_properties };
  if (contact_properties.name) {
    const [firstName, ...lastNameParts] = contact_properties.name.split(' ');
    const lastName = lastNameParts.join(' ');
    updatedContactProperties.FIRSTNAME = firstName;
    updatedContactProperties.LASTNAME = lastName;
  }

  // Construct the event options
  const eventOptions = {
    event_name,
    event_date,
    identifiers: {
      email_id,
      ext_id,
    },
    contact_properties: updatedContactProperties,
    event_properties,
  };

  try {
    // Call Brevo's createEvent function
    const result = await createEvent(eventOptions);

    // Trigger email sending if the event is 'contact_form_submission'
    if (event_name === 'contact_form_submission' && updatedContactProperties.email) {
      // Use the real email from contact properties as email_id
      email_id = updatedContactProperties.email;
      res.cookie('anonymousEmailId', email_id, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true });

      const emailResult = await prepareAndSendContactEmail(updatedContactProperties);
      res.status(emailResult.status).json(emailResult);
      return;
    }

    // Return the response from the event creation
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error handling event', error });
  }
};

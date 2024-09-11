import { Request, Response } from "express";
import { sendContactEmail } from "./brevoEmail.service";

export const handleContactFormSubmission = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, email, companyWebsite, message, getNda, consent } = req.body;

  const result = await sendContactEmail({
    name,
    email,
    companyWebsite,
    message,
    getNda,
    consent,
  });
  res.status(result.status).json(result);
};

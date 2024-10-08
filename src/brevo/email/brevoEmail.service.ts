import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";
import sanitizeHtml from "sanitize-html";
import { handleError } from "../../utils/responseHandlers";
import { AxiosError } from "axios";

interface IBrevoEmailOptions {
  subject: string;
  htmlContent: string;
  sender: { email: string };
  to: { email: string }[];
  replyTo?: { email: string; name?: string };
}

interface IContactProperties {
  name: string;
  email: string;
  companyWebsite?: string;
  message?: string;
  getNda?: boolean;
  consent: boolean;
}

export const sendBrevoEmail = async (
  options: IBrevoEmailOptions,
): Promise<IApiResponse> => {
  const { subject, htmlContent, sender, to, replyTo } = options;

  return apiRequest("post", "/smtp/email", "Email successfully sent", {
    subject,
    htmlContent,
    sender,
    to,
    replyTo,
  });
};

export const sendContactEmail = async (
  contactProperties: IContactProperties,
): Promise<IApiResponse> => {
  const { name, email, companyWebsite, message, getNda, consent } =
    contactProperties;

  // Validation
  if (!name || !email || consent === undefined) {
    return {
      status: 400,
      message:
        "Missing required fields: name, email, and consent are required.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      status: 400,
      message: "Invalid email format.",
    };
  }

  const sanitizedHtmlContent = sanitizeHtml(`
    <html>
      <body>
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
        <p><strong>Business Email:</strong> ${sanitizeHtml(email)}</p>
        <p><strong>Company Website:</strong> ${sanitizeHtml(
          companyWebsite || "N/A",
        )}</p>
        <p><strong>Message/Project Brief:</strong> ${sanitizeHtml(
          message || "N/A",
        )}</p>
        <p><strong>Get an NDA:</strong> ${getNda ? "true" : "false"}</p>
        <p><strong>Consent to Data Processing:</strong> ${
          consent ? "true" : "false"
        }</p>
      </body>
    </html>
  `);

  const brevoOptions: IBrevoEmailOptions = {
    subject: `New Contact Form Submission from ${sanitizeHtml(name)}`,
    htmlContent: sanitizedHtmlContent,
    sender: { email: process.env.PERSONAL_EMAIL || "" },
    to: [
      {
        email: process.env.PERSONAL_EMAIL || "",
      },
    ],
    replyTo: {
      email: sanitizeHtml(email),
      name: sanitizeHtml(name),
    },
  };

  try {
    return await sendBrevoEmail(brevoOptions);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

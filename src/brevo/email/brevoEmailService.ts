import axios from "axios";
import { handleSuccess, handleError } from "../../utils/responseHandlers";
import { IApiResponse } from "../../types";
import sanitizeHtml from "sanitize-html";

interface IBrevoEmailOptions {
  subject: string;
  htmlContent: string;
  sender: { name: string; email: string };
  to: { email: string; name: string }[];
  replyTo?: { email: string; name?: string };
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
  attachments?: Array<{ url?: string; content?: string; name: string }>;
}

export const sendBrevoEmail = async (
  options: IBrevoEmailOptions,
): Promise<IApiResponse> => {
  const {
    subject,
    htmlContent,
    sender,
    to,
    replyTo,
    headers,
    params,
    attachments,
  } = options;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        subject,
        htmlContent,
        sender,
        to,
        replyTo,
        headers,
        params,
        attachments,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY || "",
        },
      },
    );

    return handleSuccess(response, "Email successfully sent");
  } catch (error) {
    return handleError(error);
  }
};

export const SendContactEmail = async (
  contactProperties: any,
): Promise<IApiResponse> => {
  const {
    FIRSTNAME,
    LASTNAME,
    email,
    companyWebsite,
    message,
    getNda,
    consent,
  } = contactProperties;

  if (!FIRSTNAME || !email || consent === undefined) {
    return {
      status: 400,
      message:
        "Missing required fields: FIRSTNAME, email, and consent are required.",
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
        <p><strong>First Name:</strong> ${sanitizeHtml(FIRSTNAME)}</p>
        <p><strong>Last Name:</strong> ${sanitizeHtml(LASTNAME)}</p>
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
    subject: `New Contact Form Submission from ${sanitizeHtml(
      FIRSTNAME,
    )} ${sanitizeHtml(LASTNAME)}`,
    htmlContent: sanitizedHtmlContent,
    sender: { name: "Contact Form", email: process.env.PERSONAL_EMAIL || "" },
    to: [
      {
        email: process.env.PERSONAL_EMAIL || "",
        name: `${sanitizeHtml(FIRSTNAME)} ${sanitizeHtml(LASTNAME)}`,
      },
    ],
    replyTo: {
      email: sanitizeHtml(email),
      name: `${sanitizeHtml(FIRSTNAME)} ${sanitizeHtml(LASTNAME)}`,
    },
  };

  return sendBrevoEmail(brevoOptions);
};

// interface ITransactionalEmailFilter {
//   email?: string;
//   templateId?: number;
//   messageId?: string;
//   startDate?: string;
//   endDate?: string;
//   sort?: 'asc' | 'desc';
//   limit?: number;
//   offset?: number;
// }

// export const getTransactionalEmails = async (
//   filters: ITransactionalEmailFilter
// ): Promise<IApiResponse> => {
//   const { email, templateId, messageId, startDate, endDate, sort = 'desc', limit = 500, offset = 0 } = filters;

//   try {
//     const response = await axios.get(
//       'https://api.brevo.com/v3/smtp/emails',
//       {
//         params: {
//           email,
//           templateId,
//           messageId,
//           startDate,
//           endDate,
//           sort,
//           limit,
//           offset,
//         },
//         headers: {
//           'Content-Type': 'application/json',
//           'api-key': process.env.BREVO_API_KEY || '',
//         },
//       }
//     );

//     return handleSuccess(response, 'Transactional emails retrieved successfully');
//   } catch (error) {
//     return handleError(error);
//   }
// };

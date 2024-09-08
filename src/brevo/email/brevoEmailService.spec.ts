import { sendBrevoEmail, sendContactEmail } from "./brevoEmailService";
import { apiRequest } from "../../utils/apiRequest";
import { IApiResponse } from "../../types";
import sanitizeHtml from "sanitize-html";
import { handleError } from "../../utils/responseHandlers";
import { AxiosError } from "axios";

jest.mock("../../utils/apiRequest");
jest.mock("sanitize-html");
jest.mock("../../utils/responseHandlers");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;
const mockedHandleError = handleError as jest.MockedFunction<
  typeof handleError
>;

describe("BrevoEmailService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sendBrevoEmail", () => {
    it("should send an email successfully", async () => {
      const mockResponse: IApiResponse = {
        status: 200,
        message: "Email successfully sent",
      };
      mockedApiRequest.mockResolvedValue(mockResponse);

      const options = {
        subject: "Test Subject",
        htmlContent: "<p>Test Content</p>",
        sender: { email: "sender@example.com" },
        to: [{ email: "recipient@example.com" }],
      };

      const result = await sendBrevoEmail(options);

      expect(mockedApiRequest).toHaveBeenCalledWith(
        "post",
        "/smtp/email",
        "Email successfully sent",
        options,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("sendContactEmail", () => {
    it("should return error if required fields are missing", async () => {
      const contactProperties = {
        name: "",
        email: "",
        consent: false,
      };

      const result = await sendContactEmail(contactProperties);

      expect(result).toEqual({
        status: 400,
        message:
          "Missing required fields: name, email, and consent are required.",
      });
    });

    it("should return error if email format is invalid", async () => {
      const contactProperties = {
        name: "John Doe",
        email: "invalid-email",
        consent: true,
      };

      const result = await sendContactEmail(contactProperties);

      expect(result).toEqual({
        status: 400,
        message: "Invalid email format.",
      });
    });

    it("should send a contact email successfully", async () => {
      const mockResponse: IApiResponse = {
        status: 200,
        message: "Email successfully sent",
      };
      mockedApiRequest.mockResolvedValue(mockResponse);
      mockedHandleError.mockReturnValue({
        status: 500,
        message: "Internal Server Error",
      });
      const contactProperties = {
        name: "John Doe",
        email: "john.doe@example.com",
        companyWebsite: "https://example.com",
        message: "This is a message.",
        getNda: true,
        consent: true,
      };

      const result = await sendContactEmail(contactProperties);

      const sanitizedHtmlContent = sanitizeHtml(`
        <html>
          <body>
            <h1>Contact Form Submission</h1>
            <p><strong>Name:</strong> ${sanitizeHtml(
              contactProperties.name
            )}</p>
            <p><strong>Business Email:</strong> ${sanitizeHtml(
              contactProperties.email
            )}</p>
            <p><strong>Company Website:</strong> ${sanitizeHtml(
              contactProperties.companyWebsite || "N/A"
            )}</p>
            <p><strong>Message/Project Brief:</strong> ${sanitizeHtml(
              contactProperties.message || "N/A"
            )}</p>
            <p><strong>Get an NDA:</strong> ${
              contactProperties.getNda ? "true" : "false"
            }</p>
            <p><strong>Consent to Data Processing:</strong> ${
              contactProperties.consent ? "true" : "false"
            }</p>
          </body>
        </html>
      `);

      expect(mockedApiRequest).toHaveBeenCalledWith(
        "post",
        "/smtp/email",
        "Email successfully sent",
        {
          subject: `New Contact Form Submission from ${sanitizeHtml(
            contactProperties.name
          )}`,
          htmlContent: sanitizedHtmlContent,
          sender: { email: process.env.PERSONAL_EMAIL || "" },
          to: [{ email: process.env.PERSONAL_EMAIL || "" }],
          replyTo: {
            email: sanitizeHtml(contactProperties.email),
            name: sanitizeHtml(contactProperties.name),
          },
        },
      );
      expect(result).toEqual(mockResponse);
    });

    it("should handle errors when sending contact email", async () => {
      const mockError = new AxiosError("Network Error", "ERR_NETWORK");
      mockedApiRequest.mockRejectedValue(mockError);
      mockedHandleError.mockReturnValue({
        status: 500,
        message: "Internal Server Error",
      });

      const contactProperties = {
        name: "John Doe",
        email: "john.doe@example.com",
        consent: true,
      };

      const result = await sendContactEmail(contactProperties);

      expect(mockedHandleError).toHaveBeenCalledWith(mockError);
      expect(result).toEqual({
        status: 500,
        message: "Internal Server Error",
      });
    });
  });
});

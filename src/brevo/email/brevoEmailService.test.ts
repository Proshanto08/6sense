import axios from "axios";
import { sendBrevoEmail } from "./brevoEmailService";
import { IApiResponse } from "../../types";
import { handleSuccess, handleError } from "../../utils/responseHandlers";

jest.mock("axios");
jest.mock("../../utils/responseHandlers");

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.clearAllMocks();
});

const mockSuccessResponse = (
  method: "post" | "get",
  status: number,
  data: any,
) => {
  mockedAxios[method].mockResolvedValue({ status, data });
};

const mockErrorResponse = (method: "post" | "get", errorMessage: string) => {
  mockedAxios[method].mockRejectedValue(new Error(errorMessage));
};

const mockHandleSuccess = (status: number, message: string) => {
  (handleSuccess as jest.Mock).mockImplementation((response, msg) => ({
    status: response.status,
    message: msg || message,
  }));
};

const mockHandleError = (status: number, errorMessage: string) => {
  (handleError as jest.Mock).mockImplementation((err) => ({
    status,
    message: errorMessage || err.message,
  }));
};

describe("Email Service", () => {
  describe("sendBrevoEmail", () => {
    it("should send an email successfully", async () => {
      const emailOptions = {
        subject: "Test Subject",
        htmlContent: "<p>Test Content</p>",
        sender: { name: "Sender Name", email: "sender@example.com" },
        to: [{ email: "recipient@example.com", name: "Recipient Name" }],
        replyTo: { email: "replyto@example.com", name: "Reply To" },
        headers: { "X-Custom-Header": "value" },
        params: { param1: "value1" },
        attachments: [{ name: "attachment.txt", content: "file content" }],
      };

      mockSuccessResponse("post", 200, {});
      mockHandleSuccess(200, "Email successfully sent");

      const result: IApiResponse = await sendBrevoEmail(emailOptions);

      expect(result.status).toBe(200);
      expect(result.message).toBe("Email successfully sent");
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://api.brevo.com/v3/smtp/email",
        emailOptions,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY || "",
          },
        },
      );
    });

    it("should handle errors when sending an email", async () => {
      const emailOptions = {
        subject: "Test Subject",
        htmlContent: "<p>Test Content</p>",
        sender: { name: "Sender Name", email: "sender@example.com" },
        to: [{ email: "recipient@example.com", name: "Recipient Name" }],
      };

      mockErrorResponse("post", "Error");
      mockHandleError(500, "Error");

      const result: IApiResponse = await sendBrevoEmail(emailOptions);

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });
});

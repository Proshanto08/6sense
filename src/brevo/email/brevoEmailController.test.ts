import request from "supertest";
import express from "express";
import { handleContactFormSubmission } from "./brevoEmailController";
import { sendContactEmail } from "./brevoEmailService";

jest.mock("./brevoEmailService");

const app = express();
app.use(express.json());
app.post("/contact-form", handleContactFormSubmission);

describe("Contact Form Submission Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle contact form submission", async () => {
    const mockData = {
      name: "John Doe",
      email: "john.doe@example.com",
      companyWebsite: "https://example.com",
      message: "Hello, this is a message.",
      getNda: true,
      consent: true,
    };

    const mockResult = { status: 200, data: { success: true } };

    (sendContactEmail as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).post("/contact-form").send(mockData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResult);
    expect(sendContactEmail).toHaveBeenCalledWith(mockData);
  });

  it("should handle service failure", async () => {
    const mockData = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      companyWebsite: "https://another-example.com",
      message: "Another message.",
      getNda: false,
      consent: false,
    };

    const mockResult = { status: 500, data: { error: "Service error" } };

    (sendContactEmail as jest.Mock).mockResolvedValue(mockResult);

    const response = await request(app).post("/contact-form").send(mockData);

    expect(response.status).toBe(500);
    expect(response.body).toEqual(mockResult);
    expect(sendContactEmail).toHaveBeenCalledWith(mockData);
  });
});

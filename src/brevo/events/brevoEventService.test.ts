import { initializeBrevoClient } from "../../config/brevoConfig";
import { createEvent } from "./brevoEventService";
import { IApiResponse } from "../../types";
import { handleSuccess, handleError } from "../../utils/responseHandlers";

jest.mock("../../config/brevoConfig");
jest.mock("../../utils/responseHandlers");

const mockedBrevoClient = {
  post: jest.fn(),
};

beforeEach(() => {
  (initializeBrevoClient as jest.Mock).mockReturnValue(mockedBrevoClient);
  jest.clearAllMocks();
});

const mockBrevoClientResponse = (status: number, data: any) => {
  mockedBrevoClient.post.mockResolvedValue({ status, data });
};

const mockBrevoClientError = (errorMessage: string) => {
  mockedBrevoClient.post.mockRejectedValue(new Error(errorMessage));
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

describe("Event Service", () => {
  describe("createEvent", () => {
    it("should create an event successfully", async () => {
      const eventOptions = {
        event_name: "UserSignup",
        event_date: "2024-08-27",
        identifiers: { email_id: "test@example.com" },
        contact_properties: { name: "John Doe" },
        event_properties: { source: "website" },
      };

      mockBrevoClientResponse(201, {});
      mockHandleSuccess(201, "Event created successfully");

      const result: IApiResponse = await createEvent(eventOptions);

      expect(result.status).toBe(201);
      expect(result.message).toBe("Event created successfully");
      expect(mockedBrevoClient.post).toHaveBeenCalledWith(
        "/events",
        eventOptions,
      );
    });

    it("should handle errors when creating an event", async () => {
      const eventOptions = {
        event_name: "UserSignup",
        event_date: "2024-08-27",
        identifiers: { email_id: "test@example.com" },
      };

      mockBrevoClientError("Error");
      mockHandleError(500, "Error");

      const result: IApiResponse = await createEvent(eventOptions);

      expect(result.status).toBe(500);
      expect(result.message).toBe("Error");
    });
  });
});

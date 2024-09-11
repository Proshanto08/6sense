import axios from "axios";
import {
  updateUserProfile,
  trackUserEvent,
  mergeIdentities,
  handleTrackEvent,
} from "./mixpanel.service";
import { handleSuccess, handleError } from "../utils/responseHandlers";

jest.mock("../config/mixpanelConfig", () => {
  return {
    mixpanelConfig: {
      peopleApiUrl: "mockPeopleApiUrl",
      apiUrl: "mockApiUrl",
      importApiUrl: "mockImportApiUrl",
      projectToken: "mockProjectToken",
      apiSecretToken: "mockApiSecretToken",
    },
  };
});

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => {
      return "mock-uuid";
    }),
  };
});

jest.mock("../utils/responseHandlers", () => {
  return {
    handleSuccess: jest.fn(),
    handleError: jest.fn(),
  };
});

jest.mock("axios");

describe("Mixpanel Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update user profile successfully", async () => {
    const mockResponse = { data: "success" };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);
    (handleSuccess as jest.Mock).mockReturnValue({
      status: 200,
      message: "Request successful",
      data: mockResponse.data,
    });

    const result = await updateUserProfile("mockDistinctId", {
      email: "test@example.com",
    });

    expect(axios.post).toHaveBeenCalledWith("mockPeopleApiUrl", null, {
      params: {
        data: JSON.stringify({
          $token: "mockProjectToken",
          $distinct_id: "mockDistinctId",
          $set: { email: "test@example.com" },
        }),
      },
      auth: undefined,
      headers: undefined,
    });

    expect(result).toEqual({
      status: 200,
      message: "Request successful",
      data: mockResponse.data,
    });
  });

  it("should handle error when updating user profile fails", async () => {
    const mockError = new Error("Request failed");
    (axios.post as jest.Mock).mockRejectedValue(mockError);
    (handleError as jest.Mock).mockReturnValue({
      status: 500,
      message: "Error occurred",
    });

    const result = await updateUserProfile("mockDistinctId", {
      email: "test@example.com",
    });

    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(result).toEqual({
      status: 500,
      message: "Error occurred",
    });
  });

  it("should track user event successfully", async () => {
    const mockResponse = { data: "success" };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);
    (handleSuccess as jest.Mock).mockReturnValue({
      status: 200,
      message: "Request successful",
      data: mockResponse.data,
    });

    const result = await trackUserEvent("mockDistinctId", "Test Event", {
      eventProp: "value",
    });

    expect(axios.post).toHaveBeenCalledWith("mockApiUrl", null, {
      params: {
        data: JSON.stringify({
          event: "Test Event",
          properties: {
            distinct_id: "mockDistinctId",
            token: "mockProjectToken",
            eventProp: "value",
          },
        }),
      },
      auth: undefined,
      headers: undefined,
    });

    expect(result).toEqual({
      status: 200,
      message: "Request successful",
      data: mockResponse.data,
    });
  });

  it("should handle error when tracking user event fails", async () => {
    const mockError = new Error("Request failed");
    (axios.post as jest.Mock).mockRejectedValue(mockError);
    (handleError as jest.Mock).mockReturnValue({
      status: 500,
      message: "Error occurred",
    });

    const result = await trackUserEvent("mockDistinctId", "Test Event", {
      eventProp: "value",
    });

    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(result).toEqual({
      status: 500,
      message: "Error occurred",
    });
  });

  it("should merge identities successfully", async () => {
    const mockResponse = { data: "success" };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);
    (handleSuccess as jest.Mock).mockReturnValue({
      status: 200,
      message: "Request successful",
      data: mockResponse.data,
    });

    const result = await mergeIdentities("anonId", "identifiedId");

    expect(axios.post).toHaveBeenCalledWith("mockImportApiUrl", null, {
      params: {
        data: JSON.stringify({
          event: "$merge",
          properties: {
            $distinct_ids: ["anonId", "identifiedId"],
          },
          token: "mockProjectToken",
        }),
      },
      auth: {
        username: "mockProjectToken",
        password: "mockApiSecretToken",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    expect(result).toEqual({
      status: 200,
      message: "Request successful",
      data: mockResponse.data,
    });
  });

  it("should handle error when merging identities fails", async () => {
    const mockError = new Error("Request failed");
    (axios.post as jest.Mock).mockRejectedValue(mockError);
    (handleError as jest.Mock).mockReturnValue({
      status: 500,
      message: "Error occurred",
    });

    const result = await mergeIdentities("anonId", "identifiedId");

    expect(handleError).toHaveBeenCalledWith(mockError);
    expect(result).toEqual({
      status: 500,
      message: "Error occurred",
    });
  });

  it("should handle track event workflow successfully", async () => {
    const mockUpdateResponse = {
      status: 200,
      data: { distinctId: "test@example.com" },
    };
    const mockMergeResponse = { status: 200, data: "success" };
    const mockTrackResponse = {
      status: 200,
      data: { distinctId: "test@example.com" },
    };

    (axios.post as jest.Mock)
      .mockResolvedValueOnce(mockUpdateResponse)
      .mockResolvedValueOnce(mockMergeResponse)
      .mockResolvedValueOnce(mockTrackResponse);

    const result = await handleTrackEvent(
      "Test Event",
      { email: "test@example.com" },
      { eventProp: "value" },
      { distinctId: "previousDistinctId" },
    );

    expect(result).toEqual({
      status: 200,
      message: "Event tracked successfully in Mixpanel",
      data: { distinctId: "test@example.com" },
    });
  });

  it("should handle error in track event workflow when updateUserProfile fails", async () => {
    const mockError = new Error("Request failed");
    (axios.post as jest.Mock).mockRejectedValueOnce(mockError);
    (handleError as jest.Mock).mockReturnValue({
      status: 500,
      message: "Error occurred",
    });

    const result = await handleTrackEvent(
      "Test Event",
      { email: "test@example.com" },
      { eventProp: "value" },
      { distinctId: "previousDistinctId" },
    );

    expect(result).toEqual({
      status: 500,
      message: "Error occurred",
    });
  });

  it("should handle error in track event workflow when mergeIdentities fails", async () => {
    const mockUpdateResponse = {
      status: 200,
      data: { distinctId: "test@example.com" },
    };
    const mockMergeError = new Error("Merge failed");
    (axios.post as jest.Mock).mockResolvedValueOnce(mockUpdateResponse);
    (axios.post as jest.Mock).mockRejectedValueOnce(mockMergeError);
    (handleError as jest.Mock).mockReturnValue({
      status: 500,
      message: "Merge error occurred",
    });

    const result = await handleTrackEvent(
      "Test Event",
      { email: "test@example.com" },
      { eventProp: "value" },
      { distinctId: "previousDistinctId" },
    );

    expect(result).toEqual({
      status: 500,
      message: "Merge error occurred",
    });
  });

  it("should handle error in track event workflow when trackUserEvent fails", async () => {
    const mockUpdateResponse = {
      status: 200,
      data: { distinctId: "test@example.com" },
    };
    const mockMergeResponse = { status: 200, data: "success" };
    const mockTrackError = new Error("Track event failed");
    (axios.post as jest.Mock).mockResolvedValueOnce(mockUpdateResponse);
    (axios.post as jest.Mock).mockResolvedValueOnce(mockMergeResponse);
    (axios.post as jest.Mock).mockRejectedValueOnce(mockTrackError);
    (handleError as jest.Mock).mockReturnValue({
      status: 500,
      message: "Track event error occurred",
    });

    const result = await handleTrackEvent(
      "Test Event",
      { email: "test@example.com" },
      { eventProp: "value" },
      { distinctId: "previousDistinctId" },
    );

    expect(result).toEqual({
      status: 500,
      message: "Track event error occurred",
    });
  });
});

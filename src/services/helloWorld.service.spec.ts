import { getHelloMessage } from "./helloWorld.service";
import { handleSuccess, handleError } from "../utils/responseHandlers";
import { IApiResponse } from "../types";

jest.mock("../utils/responseHandlers");

describe("getHelloMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a success message", async () => {
    const mockResponse = { message: "Hello, world!" };
    (handleSuccess as jest.Mock).mockReturnValue({
      status: 200,
      data: mockResponse,
      message: mockResponse.message,
    });

    const response: IApiResponse = await getHelloMessage();

    expect(response).toEqual({
      status: 200,
      data: mockResponse,
      message: mockResponse.message,
    });
    expect(handleSuccess).toHaveBeenCalledWith(
      { status: 200, data: mockResponse },
      mockResponse.message,
    );
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Something went wrong");
    (handleSuccess as jest.Mock).mockImplementation(() => {
      throw mockError;
    });
    (handleError as jest.Mock).mockReturnValue({
      status: 500,
      error: mockError.message,
    });

    const response: IApiResponse = await getHelloMessage();

    expect(response).toEqual({
      status: 500,
      error: mockError.message,
    });
    expect(handleError).toHaveBeenCalledWith(mockError);
  });
});

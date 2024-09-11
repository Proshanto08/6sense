import jwt, { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "./auth.service";
import AuthKey from "../models/authKeyModel";
import { handleSuccess, handleError } from "../utils/responseHandlers";
import { IApiResponse } from "../types";

jest.mock("jsonwebtoken", () => {
  return {
    sign: jest.fn(),
    verify: jest.fn(),
  };
});

jest.mock("../models/authKeyModel", () => {
  return {
    findOne: jest.fn(),
  };
});

jest.mock("../utils/responseHandlers", () => {
  return {
    handleSuccess: jest.fn(),
    handleError: jest.fn(),
  };
});

jest.mock("../config/config", () => {
  return {
    config: {
      jwtSecret: "mockJwtSecret",
      port: "3000",
      mongoURI: "mockMongoURI",
    },
  };
});

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateToken", () => {
    it("should generate a token successfully", () => {
      const mockToken = "mockToken";
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);
      (handleSuccess as jest.Mock).mockReturnValue({
        status: 200,
        data: { token: mockToken },
        message: "Token generated successfully",
      });

      const response: IApiResponse = generateToken();

      expect(response).toEqual({
        status: 200,
        data: { token: mockToken },
        message: "Token generated successfully",
      });
      expect(jwt.sign).toHaveBeenCalledWith(
        { key: "express" },
        "mockJwtSecret",
        { expiresIn: "1h" },
      );
    });

    it("should handle errors during token generation", () => {
      const mockError = new Error("Token generation error");
      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw mockError;
      });
      (handleError as jest.Mock).mockReturnValue({
        status: 500,
        error: "Token generation error",
      });

      const response: IApiResponse = generateToken();

      expect(response).toEqual({
        status: 500,
        error: "Token generation error",
      });
      expect(handleError).toHaveBeenCalledWith(
        mockError,
        "TOKEN_GENERATION_FAILED",
      );
    });
  });

  describe("verifyToken", () => {
    it("should verify token successfully", async () => {
      const mockToken = "mockToken";
      const mockDecoded: JwtPayload = { key: "express" };
      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
      (AuthKey.findOne as jest.Mock).mockResolvedValue({ key: "express" });
      (handleSuccess as jest.Mock).mockReturnValue({
        status: 200,
        data: mockDecoded,
        message: "Token verified successfully",
      });

      const response: IApiResponse = await verifyToken(mockToken);

      expect(response).toEqual({
        status: 200,
        data: mockDecoded,
        message: "Token verified successfully",
      });
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, "mockJwtSecret");
      expect(AuthKey.findOne).toHaveBeenCalledWith({ key: mockDecoded.key });
    });

    it("should handle invalid key in token", async () => {
      const mockToken = "mockToken";
      const mockDecoded: JwtPayload = { key: "invalidKey" };
      (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
      (AuthKey.findOne as jest.Mock).mockResolvedValue(null);

      (handleError as jest.Mock).mockReturnValue({
        status: 401,
        error: "Invalid key in token",
      });
      const response: IApiResponse = await verifyToken(mockToken);

      expect(response).toEqual({
        status: 401,
        error: "Invalid key in token",
      });
      expect(handleError).toHaveBeenCalledWith(
        new Error("Invalid key in token"),
        "INVALID_KEY",
        "Invalid key in token",
        401,
      );
    });

    it("should handle errors during token verification", async () => {
      const mockError = new Error("Token verification error");
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw mockError;
      });
      (handleError as jest.Mock).mockReturnValue({
        status: 500,
        error: "Token verification error",
      });

      const response: IApiResponse = await verifyToken("mockToken");

      expect(response).toEqual({
        status: 500,
        error: "Token verification error",
      });
      expect(handleError).toHaveBeenCalledWith(
        mockError,
        "TOKEN_VERIFICATION_FAILED",
      );
    });
  });
});

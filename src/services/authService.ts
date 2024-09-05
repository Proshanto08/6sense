import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import AuthKey from "../models/authKeyModel";
import { IApiResponse } from "../types";
import { handleSuccess, handleError } from "../utils/responseHandlers";

// Generate JWT token
export const generateToken = (): IApiResponse => {
  try {
    const key = "express";
    const token = jwt.sign({ key }, config.jwtSecret, { expiresIn: "1h" });
    return handleSuccess(
      { status: 200, data: { token } },
      "Token generated successfully",
    );
  } catch (error) {
    return handleError(error as Error, "TOKEN_GENERATION_FAILED");
  }
};

// Verify JWT token
export const verifyToken = async (token: string): Promise<IApiResponse> => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    const validKey = await AuthKey.findOne({ key: decoded.key });
    if (validKey) {
      return handleSuccess(
        { status: 200, data: decoded },
        "Token verified successfully",
      );
    }

    // Error handling for invalid key in token
    return handleError(
      new Error("Invalid key in token"),
      "INVALID_KEY",
      "Invalid key in token",
      401,
    );
  } catch (error) {
    return handleError(error as Error, "TOKEN_VERIFICATION_FAILED");
  }
};

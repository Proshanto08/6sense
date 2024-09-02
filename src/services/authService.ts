import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import AuthKey from "../models/authKeyModel";
import { IApiResponse } from "../types";
import { handleSuccess, handleError } from "../utils/responseHandlers";

export const generateToken = (): IApiResponse => {
  try {
    const key = "express";
    const token = jwt.sign({ key }, config.jwtSecret, { expiresIn: "1h" });
    return handleSuccess(
      { status: 200, data: { token } },
      "Token generated successfully",
    );
  } catch (error: any) {
    return handleError(error, "TOKEN_GENERATION_FAILED");
  }
};

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
    return handleError(null, "INVALID_KEY", "Invalid key in token", 401);
  } catch (error: any) {
    return handleError(error, "TOKEN_VERIFICATION_FAILED");
  }
};

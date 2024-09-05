import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/authService";
import { IApiResponse } from "../types";
import { handleError } from "../utils/responseHandlers";

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    const response: IApiResponse = handleError(
      new Error("No token provided"),
      "NO_TOKEN_PROVIDED",
      "No token provided",
      401,
    );
    res.status(response.status).json(response);
    return;
  }

  try {
    const result = await verifyToken(token);

    if (result.status !== 200) {
      res.status(result.status).json(result);
      return;
    }

    next();
  } catch (err) {
    const response: IApiResponse = handleError(
      err as Error,
      "TOKEN_VERIFICATION_FAILED",
      "Token verification failed",
      401,
    );
    res.status(response.status).json(response);
  }
};

import { Request, Response } from "express";
import { getHelloMessage } from "../services/helloWorld.service";

export const getHelloWorld = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = await getHelloMessage();
  res.status(result.status).json(result);
};

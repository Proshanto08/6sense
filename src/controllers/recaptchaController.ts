import axios from "axios";
import { Request, Response } from "express";

export const verifyRecaptchaV3 = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { recaptchaToken } = req.body;
  const secret = process.env.RECAPTCHA_SECRET_KEY;

    const recaptchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret,
          response: recaptchaToken,
        },
      }
    );

    res.json(recaptchaResponse.data);
};

export const verifyRecaptchaV2 = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { recaptchaToken } = req.body;
  const secret = process.env.RECAPTCHA_SECRET_KEY_V2;

    const recaptchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret,
          response: recaptchaToken,
        },
      }
    );

    res.json(recaptchaResponse.data);
};


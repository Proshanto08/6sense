import express, { Request, Response } from "express";
import {
  verifyRecaptchaV3,
  verifyRecaptchaV2,
} from "../controllers/recaptcha.controller";

const router = express.Router();

router.post("/verify-recaptcha-v3", async (req: Request, res: Response) => {
  await verifyRecaptchaV3(req, res);
});

router.post("/verify-recaptcha-v2", async (req: Request, res: Response) => {
  await verifyRecaptchaV2(req, res);
});

export default router;

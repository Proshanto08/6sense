import express from "express";
import { handleContactFormSubmission } from "./brevoEmailController";

const router = express.Router();

router.post("/email", handleContactFormSubmission);

export default router;

import express from "express";
import { handleContactFormSubmission } from "./brevoEmail.controller";

const router = express.Router();

router.post("/email", handleContactFormSubmission);

export default router;

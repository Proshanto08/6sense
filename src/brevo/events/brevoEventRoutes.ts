import { Router } from "express";
import { handleCreateEventByBrevoController } from "./brevoEventController";

const router = Router();

router.post("/events", handleCreateEventByBrevoController);

export default router;

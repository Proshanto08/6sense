import { Router } from "express";
import { handleCreateEventByBrevoController } from "./brevoEvent.controller";

const router = Router();

router.post("/events", handleCreateEventByBrevoController);

export default router;

import { Router } from "express";
import { handleCreateEventByBrevo } from "./brevoEventController";

const router = Router();

router.post("/events", handleCreateEventByBrevo);

export default router;

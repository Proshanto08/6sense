import express from "express";
import { handleEvent } from "../controllers/event.controller";

const router = express.Router();

router.post("/events", handleEvent);

export default router;

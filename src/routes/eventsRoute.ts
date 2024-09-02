import express from "express";
import { handleEvent } from "../controllers/eventController";

const router = express.Router();

router.post("/events", handleEvent);

export default router;

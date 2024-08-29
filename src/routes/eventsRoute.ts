import express from "express";
import {handleCreateEvent} from "../controllers/eventController";

const router = express.Router();

router.post("/events", handleCreateEvent);

export default router;
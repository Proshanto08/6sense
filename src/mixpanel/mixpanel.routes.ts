import { Router } from "express";
import {
  handleTrackEventByMixpanel,
  handleClearDistinctId,
} from "./mixpanel.controller";

const router = Router();

router.post("/track-event", handleTrackEventByMixpanel);
router.post("/clear-distinct-id", handleClearDistinctId);

export default router;

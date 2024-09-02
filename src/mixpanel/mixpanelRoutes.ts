import { Router } from "express";
import {
  handleTrackEventByMixpanel,
  handleClearDistinctId,
} from "./mixpanelController";

const router = Router();

router.post("/track-event", handleTrackEventByMixpanel);
router.post("/clear-distinct-id", handleClearDistinctId);

export default router;

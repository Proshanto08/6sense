import { Router } from 'express';
import {handleTrackEvent ,handleClearDistinctId} from './mixpanelController';

const router = Router();

router.post('/track-event', handleTrackEvent);
router.post('/clear-distinct-id', handleClearDistinctId);


export default router;

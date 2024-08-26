import { Router } from 'express';
import { trackEventController } from './mixpanelEventController';

const router = Router();

router.post('/track-event', trackEventController);

export default router;

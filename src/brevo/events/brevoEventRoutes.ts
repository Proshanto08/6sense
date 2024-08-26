import { Router } from 'express';
import { handleCreateEvent } from './brevoEventController';

const router = Router();

router.post('/events', handleCreateEvent);

export default router;

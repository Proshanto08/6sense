import express from 'express';
import { handleContactFormSubmission } from './brevoEmailController';

const router = express.Router();

router.post('/email', handleContactFormSubmission);
// router.get('/email', handleGetTransactionalEmails);


export default router;

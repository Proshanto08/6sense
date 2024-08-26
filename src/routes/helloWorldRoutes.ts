import express from 'express';
import { authToken } from '../middleware/authMiddleware';
import { getHelloWorld } from '../controllers/helloWorldController';

const router = express.Router();

router.get('/hello-world', authToken, getHelloWorld);

export default router;

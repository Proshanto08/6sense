import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import corsMiddleware from './middleware/corsMiddleware';
import rateLimiter from './middleware/rateLimitMiddleware';
import helloWorldRoutes from './routes/helloWorldRoutes';
import brevoFolderRoutes from './brevo/folders/brevoFolderRoutes';
import brevoContactRoutes from './brevo/contact/brevoContactRoutes';
import brevoListRoutes from './brevo/lists/brevoListRoutes';
import brevoEventRoutes from './brevo/events/brevoEventRoutes';
import emailRoutes from './brevo/email/brevoEmailRoutes';
import mixpanelEventRoutes from './mixpanel/mixpanelEventRoutes';
import caseStudyRoutes from './routes/caseStudyRoutes'
import { generateToken } from './services/authService';

const app = express();
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(rateLimiter);
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', async (req: Request, res: Response) => {
  const tokenResponse = await generateToken();

  res.status(tokenResponse.status).json({
    status: tokenResponse.status,
    message: 'Hello 6sense. The app is running on port 3000',
    token: tokenResponse.data.token,
  });
});


app.use('/', helloWorldRoutes);
app.use('/brevo', brevoFolderRoutes);
app.use('/brevo', brevoContactRoutes);
app.use('/brevo', brevoListRoutes);
app.use('/brevo', brevoEventRoutes);
app.use('/brevo', emailRoutes);
app.use('/mixpanel', mixpanelEventRoutes);
app.use('/case-study', caseStudyRoutes);

export default app;

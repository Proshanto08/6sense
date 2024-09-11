import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import corsMiddleware from "./middleware/corsMiddleware";
import rateLimiter from "./middleware/rateLimitMiddleware";
import helloWorldRoutes from "./routes/helloWorld.routes";
import brevoFolderRoutes from "./brevo/folders/brevoFolder.routes";
import brevoContactRoutes from "./brevo/contact/brevoContact.routes";
import brevoListRoutes from "./brevo/lists/brevoList.routes";
import brevoEventRoutes from "./brevo/events/brevoEvent.routes";
import brevoEmailRoutes from "./brevo/email/brevoEmail.routes";
import caseStudyRoutes from "./routes/caseStudy.routes";
import { generateToken } from "./services/auth.service";
import mixpanelRoutes from "./mixpanel/mixpanel.routes";
import eventsRoutes from "./routes/events.routes";
import teamGalleryRoutes from "./routes/teamGallery.routes";
import recaptchaRoutes from "./routes/recaptcha.routes";

const app = express();
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(rateLimiter);
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  const tokenResponse = await generateToken();

  res.status(tokenResponse.status).json({
    status: tokenResponse.status,
    message: "Hello 6sense. The app is running on port 3000",
    token: tokenResponse.data.token,
  });
});

app.use("/", helloWorldRoutes);
app.use("/brevo", brevoFolderRoutes);
app.use("/brevo", brevoContactRoutes);
app.use("/brevo", brevoListRoutes);
app.use("/brevo", brevoEventRoutes);
app.use("/brevo", brevoEmailRoutes);
app.use("/", caseStudyRoutes);
app.use("/mixpanel", mixpanelRoutes);
app.use("/", eventsRoutes);
app.use("/", teamGalleryRoutes);
app.use("/", recaptchaRoutes);

export default app;

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import corsMiddleware from "./middleware/corsMiddleware";
import rateLimiter from "./middleware/rateLimitMiddleware";
import helloWorldRoutes from "./routes/helloWorldRoutes";
import brevoFolderRoutes from "./brevo/folders/brevoFolderRoutes";
import brevoContactRoutes from "./brevo/contact/brevoContactRoutes";
import brevoListRoutes from "./brevo/lists/brevoListRoutes";
import brevoEventRoutes from "./brevo/events/brevoEventRoutes";
import brevoEmailRoutes from "./brevo/email/brevoEmailRoutes";
import caseStudyRoutes from "./routes/caseStudyRoutes";
import { generateToken } from "./services/authService";
import mixpanelRoutes from "./mixpanel/mixpanelRoutes";
import eventsRoutes from "./routes/eventsRoute";
import teamGalleryRoutes from "./routes/teamGalleryRoutes";

const app = express();
app.use(helmet());
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

export default app;

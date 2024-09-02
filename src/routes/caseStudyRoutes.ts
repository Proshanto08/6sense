import express from "express";
import {
  createProjectController,
  getAllProjectsController,
  getProjectBySlugController,
  updateProjectController,
  deleteProjectBySlugController,
  getBasicProjectsController,
} from "../controllers/caseStudyController";

const router = express.Router();

router.get("/case-studies", getBasicProjectsController);
router.get("/case-studies/projects", getAllProjectsController);
router.post("/case-studies", createProjectController);
router.get("/case-studies/:slug", getProjectBySlugController);
router.put("/case-studies/:slug", updateProjectController);
router.delete("/case-studies/:slug", deleteProjectBySlugController);

export default router;

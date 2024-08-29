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
router.post("/projects", createProjectController);
router.get("/:slug", getProjectBySlugController);
router.put("/projects/:slug", updateProjectController);
router.delete("/projects/:slug", deleteProjectBySlugController);

export default router;

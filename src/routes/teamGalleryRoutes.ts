import express from "express";
import {
  createTeamGalleryController,
  getAllTeamGalleriesController,
  getTeamGalleryByIdController,
  updateTeamGalleryController,
  deleteTeamGalleryByIdController,
} from "../controllers/teamGalleryController";

const router = express.Router();

router.get("/team-gallery/all", getAllTeamGalleriesController);
router.post("/team-gallery", createTeamGalleryController);
router.get("/team-gallery/:id", getTeamGalleryByIdController);
router.put("/team-gallery/:id", updateTeamGalleryController);
router.delete("/team-gallery/:id", deleteTeamGalleryByIdController);

export default router;

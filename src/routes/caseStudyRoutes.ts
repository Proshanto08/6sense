import express from 'express';
import {
  createProjectController,
  getAllProjectsController,
  getProjectBySlugController,
  updateProjectController,
  deleteProjectBySlugController
} from '../controllers/caseStudyController';

const router = express.Router();

router.get('/projects', getAllProjectsController);
router.post('/projects', createProjectController);
router.get('/projects/:slug', getProjectBySlugController); 
router.put('/projects/:slug', updateProjectController); 
router.delete('/projects/:slug', deleteProjectBySlugController); 

export default router;

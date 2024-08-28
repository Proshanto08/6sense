import express from 'express';
import {
  createProjectController,
  getAllProjectsController,
  getProjectBySlugController,
  updateProjectController,
  deleteProjectBySlugController,
  getBasicProjectsController
} from '../controllers/caseStudyController';

const router = express.Router();

router.get('/case-study', getBasicProjectsController);
router.get('/case-study/projects', getAllProjectsController);
router.post('/projects', createProjectController);
router.get('/:slug', getProjectBySlugController); 
router.put('/:slug', updateProjectController); 
router.delete('/:slug', deleteProjectBySlugController); 

export default router;

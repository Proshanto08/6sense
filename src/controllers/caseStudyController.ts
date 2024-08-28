import { Request, Response } from 'express';
import { createProject, updateProject, getAllProjects, getProjectBySlug, deleteProjectBySlug, getBasicProjects } from '../services/caseStudyService';
import { IApiResponse, IProject } from '../types';
import { handleProjectUploads } from './fileUploadMiddleware';
import { processFiles } from './fileHelpers';

export const createProjectController = async (req: Request, res: Response): Promise<void> => {
  handleProjectUploads(req, res, async () => {
    const projectData: IProject = processFiles(req, req.body);

    const result: IApiResponse = await createProject(projectData);
    res.status(result.status).json(result);
  });
};

export const updateProjectController = async (req: Request, res: Response): Promise<void> => {
  handleProjectUploads(req, res, async () => {
    const { slug } = req.params;
    const updateData: Partial<IProject> = processFiles(req, req.body);

    const result: IApiResponse = await updateProject(slug, updateData);
    res.status(result.status).json(result);
  });
};

export const getBasicProjectsController = async (req: Request, res: Response): Promise<void> => {
  const page: number = parseInt(req.query.page as string, 10) || 1;
  const limit: number = parseInt(req.query.limit as string, 10) || 6;

  const result: IApiResponse = await getBasicProjects(page, limit);
  res.status(result.status).json(result);
};

export const getAllProjectsController = async (_req: Request, res: Response): Promise<void> => {
  const result: IApiResponse = await getAllProjects();
  res.status(result.status).json(result);
};

export const getProjectBySlugController = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const result: IApiResponse = await getProjectBySlug(slug);
  res.status(result.status).json(result);
};

export const deleteProjectBySlugController = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const result: IApiResponse = await deleteProjectBySlug(slug);
  res.status(result.status).json(result);
};

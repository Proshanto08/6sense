import { Request, Response } from 'express';
import { createProject, getAllProjects, getProjectBySlug, updateProject, deleteProjectBySlug } from '../services/caseStudyService';
import { IApiResponse,IProject } from '../types';

export const createProjectController = async (req: Request, res: Response): Promise<void> => {
  const projectData: IProject = req.body;
  const result: IApiResponse = await createProject(projectData);
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

export const updateProjectController = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const updateData: Partial<IProject> = req.body;
  const result: IApiResponse = await updateProject(slug, updateData);
  res.status(result.status).json(result);
};

export const deleteProjectBySlugController = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  const result: IApiResponse = await deleteProjectBySlug(slug);
  res.status(result.status).json(result);
};

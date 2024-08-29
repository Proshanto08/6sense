import { Request, Response } from "express";
import {
  createProject,
  updateProject,
  getAllProjects,
  getProjectBySlug,
  deleteProjectBySlug,
  getBasicProjects,
} from "../services/caseStudyService";
import { IApiResponse } from "../types";
import { handleProjectUploads, processFiles } from "../multer/caseStudIesImageUpload";
import fs from "fs";
import path from "path";
import { IProject } from "../models/casestudyModel";

const deleteFile = (filePath: string) => {
  const fullPath = path.join(__dirname, "../uploads", path.basename(filePath));
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(`Error deleting file ${fullPath}:`, err);
    }
  });
};

export const createProjectController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  handleProjectUploads(req, res, async () => {
    const projectData: IProject = processFiles(req, req.body);

    const result: IApiResponse = await createProject(projectData);
    res.status(result.status).json(result);
  });
};

export const updateProjectController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  handleProjectUploads(req, res, async () => {
    const { slug } = req.params;
    const updateData: Partial<IProject> = processFiles(req, req.body);

    const project: IApiResponse = await getProjectBySlug(slug);

    if (project.status !== 200) {
      res.status(project.status).json(project);
      return;
    }

    const oldProjectData = project.data;
    const filesToDelete = [
      oldProjectData.logo,
      oldProjectData.imageSrc,
      oldProjectData.details?.overviewImage,
      oldProjectData.details?.solution?.solutionImage,
      oldProjectData.details?.keyFeature?.keyFeaturesImage,
      oldProjectData.details?.result?.resultImage,
      oldProjectData.details?.clientFeedback?.clientImage,
    ].filter(Boolean) as string[];

    filesToDelete.forEach((filePath) => {
      if (filePath) {
        deleteFile(filePath);
      }
    });

    const result: IApiResponse = await updateProject(slug, updateData);
    res.status(result.status).json(result);
  });
};

export const getBasicProjectsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const page: number = parseInt(req.query.page as string, 10) || 1;
  const limit: number = parseInt(req.query.limit as string, 10) || 6;

  const result: IApiResponse = await getBasicProjects(page, limit);
  res.status(result.status).json(result);
};

export const getAllProjectsController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const result: IApiResponse = await getAllProjects();
  res.status(result.status).json(result);
};

export const getProjectBySlugController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { slug } = req.params;
  const result: IApiResponse = await getProjectBySlug(slug);
  res.status(result.status).json(result);
};

export const deleteProjectBySlugController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { slug } = req.params;

  const project: IApiResponse = await getProjectBySlug(slug);

  if (project.status !== 200) {
    res.status(project.status).json(project);
    return;
  }

  const projectData = project.data;

  const filesToDelete = [
    projectData.logo,
    projectData.imageSrc,
    projectData.details?.overviewImage,
    projectData.details?.solution?.solutionImage,
    projectData.details?.keyFeature?.keyImage,
    projectData.details?.result?.resultImage,
    projectData.details?.clientFeedback?.clientImage,
  ].filter(Boolean) as string[];

  filesToDelete.forEach((filePath) => {
    if (filePath) {
      deleteFile(filePath);
    }
  });

  const result: IApiResponse = await deleteProjectBySlug(slug);
  res.status(result.status).json(result);
};

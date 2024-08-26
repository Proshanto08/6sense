import Project from '../models/casestudyModel';
import { IApiResponse,IProject } from '../types';
import slugify from 'slugify';

const createApiResponse = (
  status: number,
  message: string,
  data: any = {},
  errorCode?: string
): IApiResponse => {
  return { status, message, data, errorCode };
};

export const createProject = async (projectData: IProject): Promise<IApiResponse> => {
  try {
    const existingProject = await Project.findOne({ appName: projectData.appName });
    if (existingProject) {
      return createApiResponse(400, 'A project with this app name already exists');
    }

    if (!projectData.slug) {
      projectData.slug = slugify(projectData.appName, { lower: true, strict: true });
    }

    const createdProject = await Project.create(projectData);
    return createApiResponse(201, 'Project successfully created', createdProject);
  } catch (error: any) {
    return createApiResponse(error.status || 500, error.message || 'An error occurred');
  }
};

export const getAllProjects = async (): Promise<IApiResponse> => {
  try {
    const projects = await Project.find();
    return createApiResponse(200, 'Projects retrieved successfully', projects);
  } catch (error: any) {
    return createApiResponse(error.status || 500, error.message || 'An error occurred');
  }
};

export const getProjectBySlug = async (slug: string): Promise<IApiResponse> => {
  try {
    const project = await Project.findOne({ slug });
    if (project) {
      return createApiResponse(200, 'Project details retrieved successfully', project);
    } else {
      return createApiResponse(404, 'Project not found');
    }
  } catch (error: any) {
    return createApiResponse(error.status || 500, error.message || 'An error occurred');
  }
};

export const updateProject = async (slug: string, updateData: Partial<IProject>): Promise<IApiResponse> => {
  try {
    if (updateData.title) {
      updateData.slug = slugify(updateData.title, { lower: true, strict: true });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true }
    );

    if (updatedProject) {
      return createApiResponse(200, 'Project successfully updated', updatedProject);
    } else {
      return createApiResponse(404, 'Project not found');
    }
  } catch (error: any) {
    return createApiResponse(error.status || 500, error.message || 'An error occurred');
  }
};

export const deleteProjectBySlug = async (slug: string): Promise<IApiResponse> => {
  try {
    const deletedProject = await Project.findOneAndDelete({ slug });
    if (deletedProject) {
      return createApiResponse(200, 'Project successfully deleted');
    } else {
      return createApiResponse(404, 'Project not found');
    }
  } catch (error: any) {
    return createApiResponse(error.status || 500, error.message || 'An error occurred');
  }
};
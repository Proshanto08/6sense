import Project, { IProject } from "../models/casestudyModel";
import { IApiResponse } from "../types";
import slugify from "slugify";
import { handleSuccess, handleError } from "../utils/responseHandlers";

export const createProject = async (
  projectData: IProject,
): Promise<IApiResponse> => {
  try {
    const existingProject = await Project.findOne({
      appName: projectData.appName,
    });
    if (existingProject) {
      return handleError({
        response: {
          status: 400,
          data: { message: "A project with this app name already exists" },
        },
      });
    }

    if (!projectData.slug) {
      projectData.slug = slugify(projectData.appName, {
        lower: true,
        strict: true,
      });
    }

    const createdProject = await Project.create(projectData);
    return handleSuccess(
      { status: 201, data: createdProject },
      "Project successfully created",
    );
  } catch (error: any) {
    return handleError(error);
  }
};

export const getAllProjects = async (): Promise<IApiResponse> => {
  try {
    const projects = await Project.find();
    return handleSuccess(
      { status: 200, data: projects },
      "Projects retrieved successfully",
    );
  } catch (error: any) {
    return handleError(error);
  }
};

export const getBasicProjects = async (
  page = 1,
  limit = 6,
): Promise<IApiResponse> => {
  try {
    const currentPage = Math.max(1, page);
    const currentLimit = Math.max(1, limit);

    const skip = (currentPage - 1) * currentLimit;

    const projects = await Project.find({}, "appName logo slug imageSrc")
      .skip(skip)
      .limit(currentLimit);

    const totalProjects = await Project.countDocuments();

    return handleSuccess(
      {
        status: 200,
        data: {
          projects,
          totalPages: Math.ceil(totalProjects / currentLimit),
          currentPage,
        },
      },
      "Basic projects retrieved successfully",
    );
  } catch (error: any) {
    return handleError(error);
  }
};

export const getProjectBySlug = async (slug: string): Promise<IApiResponse> => {
  try {
    const project = await Project.findOne({ slug });
    if (project) {
      return handleSuccess(
        { status: 200, data: project },
        "Project details retrieved successfully",
      );
    }
    return handleError({
      response: { status: 404, data: { message: "Project not found" } },
    });
  } catch (error: any) {
    return handleError(error);
  }
};

export const updateProject = async (
  slug: string,
  updateData: Partial<IProject>,
): Promise<IApiResponse> => {
  try {
    if (updateData.appName) {
      updateData.slug = slugify(updateData.appName, {
        lower: true,
        strict: true,
      });
    }

    const updatedProject = await Project.findOneAndUpdate(
      { slug },
      { $set: updateData },
      { new: true },
    );

    if (updatedProject) {
      return handleSuccess(
        { status: 200, data: updatedProject },
        "Project successfully updated",
      );
    }
    return handleError({
      response: { status: 404, data: { message: "Project not found" } },
    });
  } catch (error: any) {
    return handleError(error);
  }
};

export const deleteProjectBySlug = async (
  slug: string,
): Promise<IApiResponse> => {
  try {
    const deletedProject = await Project.findOneAndDelete({ slug });
    if (deletedProject) {
      return handleSuccess(
        { status: 200, data: {} },
        "Project successfully deleted",
      );
    }
    return handleError({
      response: { status: 404, data: { message: "Project not found" } },
    });
  } catch (error: any) {
    return handleError(error);
  }
};

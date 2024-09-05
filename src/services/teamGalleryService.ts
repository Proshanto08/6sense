import TeamGallery, { ITeamGallery } from "../models/teamGalleryModel";
import { IApiResponse } from "../types";
import { handleSuccess, handleError } from "../utils/responseHandlers";

export const createTeamGallery = async (
  galleryData: ITeamGallery,
): Promise<IApiResponse> => {
  try {
    const createdGallery = await TeamGallery.create(galleryData);
    return handleSuccess(
      { status: 201, data: createdGallery },
      "Gallery successfully created",
    );
  } catch (error) {
    return handleError(
      error as Error,
      "CREATE_GALLERY_FAILED",
      "Failed to create gallery",
      500,
    );
  }
};

export const getAllTeamGalleries = async (): Promise<IApiResponse> => {
  try {
    const galleries = await TeamGallery.find();
    return handleSuccess(
      { status: 200, data: galleries },
      "Galleries retrieved successfully",
    );
  } catch (error) {
    return handleError(
      error as Error,
      "GET_GALLERIES_FAILED",
      "Failed to retrieve galleries",
      500,
    );
  }
};

export const getTeamGalleryById = async (id: string): Promise<IApiResponse> => {
  try {
    const gallery = await TeamGallery.findById(id);
    if (gallery) {
      return handleSuccess(
        { status: 200, data: gallery },
        "Gallery details retrieved successfully",
      );
    }
    return handleError(
      new Error("Gallery not found"),
      "GALLERY_NOT_FOUND",
      "Gallery not found",
      404,
    );
  } catch (error) {
    return handleError(
      error as Error,
      "GET_GALLERY_BY_ID_FAILED",
      "Failed to retrieve gallery details",
      500,
    );
  }
};

export const updateTeamGallery = async (
  id: string,
  updateData: Partial<ITeamGallery>,
): Promise<IApiResponse> => {
  try {
    const updatedGallery = await TeamGallery.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    );

    if (updatedGallery) {
      return handleSuccess(
        { status: 200, data: updatedGallery },
        "Gallery successfully updated",
      );
    }
    return handleError(
      new Error("Gallery not found"),
      "GALLERY_NOT_FOUND",
      "Gallery not found",
      404,
    );
  } catch (error) {
    return handleError(
      error as Error,
      "UPDATE_GALLERY_FAILED",
      "Failed to update gallery",
      500,
    );
  }
};

export const deleteTeamGalleryById = async (
  id: string,
): Promise<IApiResponse> => {
  try {
    const deletedGallery = await TeamGallery.findByIdAndDelete(id);
    if (deletedGallery) {
      return handleSuccess(
        { status: 200, data: {} },
        "Gallery successfully deleted",
      );
    }
    return handleError(
      new Error("Gallery not found"),
      "GALLERY_NOT_FOUND",
      "Gallery not found",
      404,
    );
  } catch (error) {
    return handleError(
      error as Error,
      "DELETE_GALLERY_FAILED",
      "Failed to delete gallery",
      500,
    );
  }
};

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
  } catch (error: any) {
    return handleError(error);
  }
};

export const getAllTeamGalleries = async (): Promise<IApiResponse> => {
  try {
    const galleries = await TeamGallery.find();
    return handleSuccess(
      { status: 200, data: galleries },
      "Galleries retrieved successfully",
    );
  } catch (error: any) {
    return handleError(error);
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
    return handleError({
      response: { status: 404, data: { message: "Gallery not found" } },
    });
  } catch (error: any) {
    return handleError(error);
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
    return handleError({
      response: { status: 404, data: { message: "Gallery not found" } },
    });
  } catch (error: any) {
    return handleError(error);
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
    return handleError({
      response: { status: 404, data: { message: "Gallery not found" } },
    });
  } catch (error: any) {
    return handleError(error);
  }
};

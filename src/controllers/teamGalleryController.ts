import { Request, Response } from "express";
import {
  createTeamGallery,
  updateTeamGallery,
  getAllTeamGalleries,
  getTeamGalleryById,
  deleteTeamGalleryById,
} from "../services/teamGalleryService";
import { IApiResponse } from "../types";
import {
  handleTeamGalleryUploads,
  processTeamGalleryFiles,
} from "../multer/teamGalleryImageUpload";
import fs from "fs";
import path from "path";
import { ITeamGallery } from "../models/teamGalleryModel";

const deleteFile = (filePath: string): void => {
  const fullPath = path.join(__dirname, "../uploads", path.basename(filePath));
  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(`Error deleting file ${fullPath}:`, err);
    }
  });
};

export const createTeamGalleryController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  handleTeamGalleryUploads(req, res, async () => {
    const galleryData: ITeamGallery = processTeamGalleryFiles(req, req.body);

    const result: IApiResponse = await createTeamGallery(galleryData);
    res.status(result.status).json(result);
  });
};

export const updateTeamGalleryController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  handleTeamGalleryUploads(req, res, async () => {
    const { id } = req.params;
    const updateData: Partial<ITeamGallery> = processTeamGalleryFiles(
      req,
      req.body,
    );

    const gallery: IApiResponse = await getTeamGalleryById(id);

    if (gallery.status !== 200) {
      res.status(gallery.status).json(gallery);
      return;
    }

    const oldGalleryData = gallery.data;
    const filesToDelete = [oldGalleryData.image].filter(Boolean) as string[];

    filesToDelete.forEach((filePath) => {
      if (filePath) {
        deleteFile(filePath);
      }
    });

    const result: IApiResponse = await updateTeamGallery(id, updateData);
    res.status(result.status).json(result);
  });
};

export const getAllTeamGalleriesController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const result: IApiResponse = await getAllTeamGalleries();
  res.status(result.status).json(result);
};

export const getTeamGalleryByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const result: IApiResponse = await getTeamGalleryById(id);
  res.status(result.status).json(result);
};

export const deleteTeamGalleryByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  const gallery: IApiResponse = await getTeamGalleryById(id);

  if (gallery.status !== 200) {
    res.status(gallery.status).json(gallery);
    return;
  }

  const galleryData = gallery.data;

  const filesToDelete = [galleryData.image].filter(Boolean) as string[];

  filesToDelete.forEach((filePath) => {
    if (filePath) {
      deleteFile(filePath);
    }
  });

  const result: IApiResponse = await deleteTeamGalleryById(id);
  res.status(result.status).json(result);
};

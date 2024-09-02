import { Request } from "express";
import path from "path";
import upload from "./multerConfig";
import { ITeamGallery } from "../models/teamGalleryModel";

export const handleTeamGalleryUploads = upload.single("image");

const getRelativePath = (filePath: string | undefined): string | undefined => {
  if (!filePath) return undefined;
  return `/uploads/${path.basename(filePath)}`;
};

export const processTeamGalleryFiles = (
  req: Request,
  baseData: any,
): ITeamGallery => {
  const file = req.file;

  return {
    ...baseData,
    image: file ? getRelativePath(file.path) : baseData.image,
  };
};

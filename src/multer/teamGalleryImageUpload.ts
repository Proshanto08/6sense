import { Request } from "express";
import path from "path";
import upload from "./multerConfig";
import { ITeamGallery } from "../models/teamGalleryModel";

interface ITeamGalleryInput {
  title?: string;
  image?: string;
}

export const handleTeamGalleryUploads = upload.single("image");

const getRelativePath = (filePath: string | undefined): string => {
  if (!filePath) return "";
  return `/uploads/${path.basename(filePath)}`;
};

export const processTeamGalleryFiles = (
  req: Request,
  baseData: ITeamGalleryInput,
): ITeamGallery => {
  const file = req.file;

  return {
    ...baseData,
    image: file ? getRelativePath(file.path) : baseData.image || "",
  } as ITeamGallery;
};

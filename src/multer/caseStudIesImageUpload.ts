import { Request } from "express";
import path from "path";
import { IProject } from "../models/casestudyModel";
import upload from "./multerConfig";

export const handleProjectUploads = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "imageSrc", maxCount: 1 },
  { name: "overviewImage", maxCount: 1 },
  { name: "solutionImage", maxCount: 1 },
  { name: "keyFeaturesImage", maxCount: 1 },
  { name: "clientImage", maxCount: 1 },
  { name: "heroInfoImages", maxCount: 3 },
  { name: "aboutInfoImages", maxCount: 4 },
]);

const getRelativePath = (filePath: string | undefined): string | undefined => {
  if (!filePath) return undefined;
  return `/uploads/${path.basename(filePath)}`;
};

export const processFiles = (
  req: Request,
  baseData: Partial<IProject>,
): IProject => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[] | undefined;
  };

  const heroInfoImages = files["heroInfoImages"] || [];
  const aboutInfoImages = files["aboutInfoImages"] || [];

  return {
    ...baseData,
    logo: files["logo"]
      ? getRelativePath(files["logo"][0].path)
      : baseData.logo,
    imageSrc: files["imageSrc"]
      ? getRelativePath(files["imageSrc"][0].path)
      : baseData.imageSrc,
    details: {
      ...baseData.details,
      overviewImage: files["overviewImage"]
        ? getRelativePath(files["overviewImage"][0].path)
        : baseData.details?.overviewImage,
      clientFeedback: {
        ...baseData.details?.clientFeedback,
        clientImage: files["clientImage"]
          ? getRelativePath(files["clientImage"][0].path)
          : baseData.details?.clientFeedback?.clientImage,
      },
      solution: {
        ...baseData.details?.solution,
        solutionImage: files["solutionImage"]
          ? getRelativePath(files["solutionImage"][0].path)
          : baseData.details?.solution?.solutionImage,
      },
      keyFeature: {
        ...baseData.details?.keyFeature,
        keyFeaturesImage: files["keyFeaturesImage"]
          ? getRelativePath(files["keyFeaturesImage"][0].path)
          : baseData.details?.keyFeature?.keyFeaturesImage,
      },
      heroInfo:
        baseData.details?.heroInfo?.map((info, index) => {
          return {
            ...info,
            icon: heroInfoImages[index]
              ? getRelativePath(heroInfoImages[index].path)
              : info.icon,
          };
        }) || [],
      aboutInfo:
        baseData.details?.aboutInfo?.map((info, index) => {
          return {
            ...info,
            icon: aboutInfoImages[index]
              ? getRelativePath(aboutInfoImages[index].path)
              : info.icon,
          };
        }) || [],
    },
  } as IProject;
};

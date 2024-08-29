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
  { name: "resultImage", maxCount: 1 },
  { name: "clientImage", maxCount: 1 },
  { name: "teamIcon", maxCount: 1 },
  { name: "sprintIcon", maxCount: 1 },
  { name: "timeIcon", maxCount: 1 },
  { name: "technologiesIcon", maxCount: 1 },
  { name: "industryIcon", maxCount: 1 },
]);


const getRelativePath = (filePath: string | undefined) => {
  if (!filePath) return undefined;
  return `/uploads/${path.basename(filePath)}`;
};

export const processFiles = (req: Request, baseData: any): IProject => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[] | undefined;
  };

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
      heroInfo: baseData.details.heroInfo.map((info: any, index: number) => ({
        ...info,
        icon: files["teamIcon"] && index === 0 
          ? getRelativePath(files["teamIcon"][0].path)
          : info.icon,
      })),
      sprints: {
        icon: files["sprintIcon"]
          ? getRelativePath(files["sprintIcon"][0].path)
          : baseData.details.heroInfo[0]?.sprints?.icon, 
      },
      time: {
        icon: files["timeIcon"]
          ? getRelativePath(files["timeIcon"][0].path)
          : baseData.details.heroInfo[0]?.time?.icon, 
      },
      overviewImage: files["overviewImage"]
        ? getRelativePath(files["overviewImage"][0].path)
        : baseData.details?.overviewImage,
      aboutInfo: baseData.details.aboutInfo.map((info: any) => ({
        ...info,
        icon: files["technologiesIcon"]
          ? getRelativePath(files["technologiesIcon"][0].path)
          : info.icon,
      })),
      industryName: {
        icon: files["industryIcon"]
          ? getRelativePath(files["industryIcon"][0].path)
          : baseData.details?.aboutInfo[0]?.industryName?.icon, 
      },
      clientFeedback: {
        ...baseData.details.clientFeedback,
        clientImage: files["clientImage"]
          ? getRelativePath(files["clientImage"][0].path)
          : baseData.details.clientFeedback?.clientImage,
      },
      solution: {
        ...baseData.details.solution,
        solutionImage: files["solutionImage"]
          ? getRelativePath(files["solutionImage"][0].path)
          : baseData.details.solution?.solutionImage,
      },
      keyFeature: {
        ...baseData.details.keyFeature,
        keyFeaturesImage: files["keyFeaturesImage"]
          ? getRelativePath(files["keyFeaturesImage"][0].path)
          : baseData.details.keyFeature?.keyFeaturesImage,
      },
      result: {
        ...baseData.details.result,
        resultImage: files["resultImage"]
          ? getRelativePath(files["resultImage"][0].path)
          : baseData.details.result?.resultImage,
      },
    },
  };
};

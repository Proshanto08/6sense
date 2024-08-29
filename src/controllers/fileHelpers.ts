import { Request } from "express";
import { IProject } from "../types";
import path from "path";

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
      overviewImage: files["overviewImage"]
        ? getRelativePath(files["overviewImage"][0].path)
        : baseData.details?.overviewImage,
      sprints: {
        ...baseData.details?.sprints,
        icon: files["sprintIcon"]
          ? getRelativePath(files["sprintIcon"][0].path)
          : baseData.details?.sprints?.icon,
      },
      time: {
        ...baseData.details?.time,
        icon: files["timeIcon"]
          ? getRelativePath(files["timeIcon"][0].path)
          : baseData.details?.time?.icon,
      },
      technologies: {
        ...baseData.details?.technologies,
        icon: files["technologiesIcon"]
          ? getRelativePath(files["technologiesIcon"][0].path)
          : baseData.details?.technologies?.icon,
      },
      industry: {
        ...baseData.details?.industry,
        icon: files["industryIcon"]
          ? getRelativePath(files["industryIcon"][0].path)
          : baseData.details?.industry?.icon,
      },
    },
    solution: {
      ...baseData.solution,
      solutionImage: files["solutionImage"]
        ? getRelativePath(files["solutionImage"][0].path)
        : baseData.solution?.solutionImage,
    },
    keyFeature: {
      ...baseData.keyFeature,
      keyImage: files["keyImage"]
        ? getRelativePath(files["keyImage"][0].path)
        : baseData.keyFeature?.keyImage,
    },
    result: {
      ...baseData.result,
      resultImage: files["resultImage"]
        ? getRelativePath(files["resultImage"][0].path)
        : baseData.result?.resultImage,
    },
    clientFeedback: {
      ...baseData.clientFeedback,
      clientImage: files["clientImage"]
        ? getRelativePath(files["clientImage"][0].path)
        : baseData.clientFeedback?.clientImage,
    },
  };
};

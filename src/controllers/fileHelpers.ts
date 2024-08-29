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
      heroInfo: {
        ...baseData.details?.heroInfo,
        team: {
          ...baseData.details?.heroInfo?.team,
          icon: files["teamIcon"]
            ? getRelativePath(files["teamIcon"][0].path)
            : baseData.details?.heroInfo?.team?.icon,
        },
        sprints: {
          ...baseData.details?.heroInfo?.sprints,
          icon: files["sprintIcon"]
            ? getRelativePath(files["sprintIcon"][0].path)
            : baseData.details?.heroInfo?.sprints?.icon,
        },
        time: {
          ...baseData.details?.heroInfo?.time,
          icon: files["timeIcon"]
            ? getRelativePath(files["timeIcon"][0].path)
            : baseData.details?.heroInfo?.time?.icon,
        },
      },
      overviewImage: files["overviewImage"]
        ? getRelativePath(files["overviewImage"][0].path)
        : baseData.details?.overviewImage,
      aboutInfo: {
        ...baseData.details?.aboutInfo,
        technologies: {
          ...baseData.details?.aboutInfo?.technologies,
          icon: files["technologiesIcon"]
            ? getRelativePath(files["technologiesIcon"][0].path)
            : baseData.details?.aboutInfo?.technologies?.icon,
        },
        industryName: {
          ...baseData.details?.aboutInfo?.industryName,
          icon: files["industryIcon"]
            ? getRelativePath(files["industryIcon"][0].path)
            : baseData.details?.aboutInfo?.industryName?.icon,
        },
      },
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
      result: {
        ...baseData.details?.result,
        resultImage: files["resultImage"]
          ? getRelativePath(files["resultImage"][0].path)
          : baseData.details?.result?.resultImage,
      },
    },
  };
};

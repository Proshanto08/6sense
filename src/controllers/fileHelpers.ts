import { Request } from 'express';
import { IProject } from '../types';

export const processFiles = (req: Request, baseData: any): IProject => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[] | undefined;
  };

  return {
    ...baseData,
    logo: files['logo'] ? (files['logo'][0] as Express.Multer.File).path : baseData.logo,
    imageSrc: files['imageSrc'] ? (files['imageSrc'][0] as Express.Multer.File).path : baseData.imageSrc,
    overviewImage: files['overviewImage'] ? (files['overviewImage'][0] as Express.Multer.File).path : baseData.overviewImage,
    solutionImage: files['solutionImage'] ? (files['solutionImage'][0] as Express.Multer.File).path : baseData.solutionImage,
    keyImage: files['keyImage'] ? (files['keyImage'][0] as Express.Multer.File).path : baseData.keyImage,
    resultImage: files['resultImage'] ? (files['resultImage'][0] as Express.Multer.File).path : baseData.resultImage,
    clientImage: files['clientImage'] ? (files['clientImage'][0] as Express.Multer.File).path : baseData.clientImage,
    details: {
      ...baseData.details,
      icon: files['teamIcon'] ? (files['teamIcon'][0] as Express.Multer.File).path : baseData.details?.icon,
      sprints: {
        ...baseData.details?.sprints,
        icon: files['sprintIcon'] ? (files['sprintIcon'][0] as Express.Multer.File).path : baseData.details?.sprints?.icon
      },
      time: {
        ...baseData.details?.time,
        icon: files['timeIcon'] ? (files['timeIcon'][0] as Express.Multer.File).path : baseData.details?.time?.icon
      },
      technologies: {
        ...baseData.details?.technologies,
        icon: files['technologiesIcon'] ? (files['technologiesIcon'][0] as Express.Multer.File).path : baseData.details?.technologies?.icon
      },
      industry: {
        ...baseData.details?.industry,
        icon: files['industryIcon'] ? (files['industryIcon'][0] as Express.Multer.File).path : baseData.details?.industry?.icon
      }
    },
    solution: {
      ...baseData.solution,
      solutionImage: files['solutionImage'] ? (files['solutionImage'][0] as Express.Multer.File).path : baseData.solution?.solutionImage
    },
    keyFeature: {
      ...baseData.keyFeature,
      keyImage: files['keyImage'] ? (files['keyImage'][0] as Express.Multer.File).path : baseData.keyFeature?.keyImage
    },
    result: {
      ...baseData.result,
      resultImage: files['resultImage'] ? (files['resultImage'][0] as Express.Multer.File).path : baseData.result?.resultImage
    },
    clientFeedback: {
      ...baseData.clientFeedback,
      clientImage: files['clientImage'] ? (files['clientImage'][0] as Express.Multer.File).path : baseData.clientFeedback?.clientImage
    }
  };
};

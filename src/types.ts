import { Document } from "mongoose";

export interface IApiResponse {
  status: number;
  message: string;
  data?: any;
  errorCode?: string;
}

export interface IProject extends Document {
  id: string;
  appName: string;
  logo: string;
  slug: string;
  imageSrc: string;
  details: {
    coloredPartTitle: string;
    regularTitle: string;
    heroInfo: Array<IHeroInfo>;
    overviewParagraphs: string[];
    overviewImage?: string;
    aboutParagraph: string;
    aboutInfo: Array<IAboutInfo>;
    clientFeedback?: IClientFeedback;
    solution?: ISolution;
    keyFeature: IKeyFeature;
    result: IResult;
  };
}

interface IClientFeedback {
  clientNameAndDesignation: string;
  clientImage?: string;
  feedback: string;
}

interface ISolution {
  description: string;
  solutionsPoints1: string[];
  solutionsPoints2: string[];
  solutionImage?: string;
}

interface IResult {
  description: string;
  resultsPoints1: string[];
  resultsPoints2: string[];
  resultImage?: string;
}

interface IKeyFeature {
  description: string;
  keyFeaturesPoints1: string[];
  keyFeaturesPoints2: string[];
  keyFeaturesImage?: string;
}

interface IHeroInfoTeam {
  icon: string;
  alt: string;
  total: number;
  title: string;
  subtitle: string;
}

interface IHeroInfoSprints {
  icon: string;
  alt: string;
  total: number;
  title: string;
  subtitle: string;
}

interface IHeroInfoDuration {
  icon: string;
  alt: string;
  total: number;
  title: string;
  subtitle: string;
}

type IHeroInfo = IHeroInfoTeam | IHeroInfoSprints | IHeroInfoDuration;

interface IAboutInfoTeam {
  icon: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface IAboutInfoDuration {
  icon: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface IAboutInfoTechnologies {
  icon: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface IAboutInfoIndustry {
  icon: string;
  alt: string;
  title: string;
  subtitle: string;
}

type IAboutInfo = IAboutInfoTeam | IAboutInfoDuration | IAboutInfoTechnologies | IAboutInfoIndustry;

import { Document } from 'mongoose';

export interface IApiResponse {
  status: number;
  message: string;
  data?: any;
  errorCode?: string;
}

export interface IProject extends Document {
  appName: string;
  logo: string;
  slug: string;
  imageSrc: string;
  details:{
  coloredPartTitle: string;
  regularTitle: string,
  team: ITeam;
  sprints: ISprints;
  time: ITime;
  overviewParagraphs: string;
  overviewImage?: string;
  aboutParagraph: string;
  technologies: ITechnologies;
  industry: IIndusry;
  clientFeedback?: IClientFeedback;
  solution?: ISolution;
  keyFeature: IKeyFeature;
  result: IResult;
  }
}

interface IClientFeedback {
  clientName: string;
  clientImage?: string; 
  clientDesignation: string;
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
  keyImage?: string; 
}

interface ITeam {
  icon:string,
  alt:string,
  numberOfMembers: number;
  title: string;
  subtitle: string;
}

interface ISprints {
  icon:string,
  alt:string,
  numberOfSprints: number;
  title: string;
  subtitle: string;
}

interface ITime {
  icon:string,
  alt:string,
  numberOfMonths: number;
  title: string;
  subtitle: string;
}

interface ITechnologies {
  icon:string,
  alt:string,
  title: string;
  technologies: string[];
}
interface IIndusry {
  icon:string,
  alt:string,
  title: string;
  industryName: string;
}
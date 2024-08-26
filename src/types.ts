export interface IApiResponse {
  status: number;
  message: string;
  data?: any;
  errorCode?: string;
}

export interface IProject {
  appName: string;
  logo: string;
  slug: string;
  thumbImage: string;
  title: string;
  team: ITeam;
  sprints: ISprints;
  time: ITime;
  projectOverview: string;
  coverImage?: string;
  about: string;
  technologies: string[];
  industry: string;
  clientFeedback?: IClientFeedback;
  solution?: ISolution;
  keyFeature: IKeyFeature;
  result: IResult;
}

interface IClientFeedback {
  clientName: string;
  clientImage?: string; 
  clientDesignation: string;
  feedback: string;
}

interface ISolution {
  description: string;
  solutions: string[]; 
}

interface IResult {
  description: string;
  results: string[];
  resultImage?: string; 
}

interface IKeyFeature {
  description: string;
  features: string[];
}

interface ITeam {
  numberOfMembers: number;
  text: string;
}

interface ISprints {
  numberOfSprints: number;
  text: string;
}

interface ITime {
  numberOfMonths: number;
  text: string;
}

import mongoose, { Schema, Document } from "mongoose";

interface IHeroInfo {
  icon: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface IAboutInfo {
  icon: string;
  alt: string;
  subtitle: string;
  title: string;
}

interface ISolution {
  description: string;
  solutionsPoints1: string[];
  solutionsPoints2: string[];
  solutionImage: string;
}

interface IKeyFeature {
  description: string;
  keyFeaturesPoints1: string[];
  keyFeaturesPoints2: string[];
  keyFeaturesImage: string;
}

interface IResult {
  description: string;
  resultsPoints1: string[];
  resultsPoints2: string[];
}

interface IClientFeedback {
  clientNameAndDesignation: string;
  clientImage: string;
  feedback: string;
}

interface IDetails {
  coloredPartTitle: string;
  regularTitle: string;
  heroInfo: IHeroInfo[];
  overviewParagraphs: string[];
  overviewImage: string;
  aboutParagraph: string;
  aboutInfo: IAboutInfo[];
  solution: ISolution;
  keyFeature: IKeyFeature;
  result: IResult;
  clientFeedback: IClientFeedback;
}

export interface IProject extends Document {
  title: string;
  appName: string;
  logo: string;
  slug: string;
  imageSrc: string;
  details: IDetails;
}

const HeroInfoSchema = new Schema<IHeroInfo>({
  icon: { type: String },
  alt: { type: String },
  title: { type: String },
  subtitle: { type: String },
});

const AboutInfoSchema = new Schema<IAboutInfo>({
  icon: { type: String },
  alt: { type: String },
  subtitle: { type: String },
  title: { type: String },
});

const SolutionSchema = new Schema<ISolution>({
  description: { type: String },
  solutionsPoints1: [{ type: String }],
  solutionsPoints2: [{ type: String }],
  solutionImage: { type: String },
});

const KeyFeatureSchema = new Schema<IKeyFeature>({
  description: { type: String },
  keyFeaturesPoints1: [{ type: String }],
  keyFeaturesPoints2: [{ type: String }],
  keyFeaturesImage: { type: String },
});

const ResultSchema = new Schema<IResult>({
  description: { type: String },
  resultsPoints1: [{ type: String }],
  resultsPoints2: [{ type: String }],
});

const ClientFeedbackSchema = new Schema<IClientFeedback>({
  clientNameAndDesignation: { type: String },
  clientImage: { type: String },
  feedback: { type: String },
});

const DetailsSchema = new Schema<IDetails>({
  coloredPartTitle: { type: String },
  regularTitle: { type: String },
  heroInfo: [HeroInfoSchema],
  overviewParagraphs: [{ type: String }],
  overviewImage: { type: String },
  aboutParagraph: { type: String },
  aboutInfo: [AboutInfoSchema],
  solution: { type: SolutionSchema },
  keyFeature: { type: KeyFeatureSchema },
  result: { type: ResultSchema },
  clientFeedback: { type: ClientFeedbackSchema },
});

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String },
    appName: { type: String },
    logo: { type: String },
    slug: { type: String, unique: true },
    imageSrc: { type: String },
    details: { type: DetailsSchema },
  },
  { timestamps: true },
);

export default mongoose.model<IProject>("Project", ProjectSchema);

import mongoose, { Schema, Document } from "mongoose";
import { IProject } from "../types";

const TeamSchema = new Schema(
  {
    icon: { type: String },
    alt: { type: String },
    numberOfMembers: { type: Number },
    title: { type: String },
    subtitle: { type: String },
  },
  { _id: false },
);

const SprintsSchema = new Schema(
  {
    icon: { type: String },
    alt: { type: String },
    numberOfSprints: { type: Number },
    title: { type: String },
    subtitle: { type: String },
  },
  { _id: false },
);

const TimeSchema = new Schema(
  {
    icon: { type: String },
    alt: { type: String },
    numberOfMonths: { type: Number },
    title: { type: String },
    subtitle: { type: String },
  },
  { _id: false },
);

const HeroInfoSchema = new Schema(
  {
    icon: { type: String },
    alt: { type: String },
    numberOfMembers: { type: Number },
    numberOfSprints: { type: Number },
    numberOfMonths: { type: Number },
    team: { type: TeamSchema },
    sprints: { type: SprintsSchema },
    time: { type: TimeSchema },
    title: { type: String },
    subtitle: { type: String },
  },
  { _id: false },
);

const AboutInfoSchema = new Schema(
  {
    icon: { type: String },
    alt: { type: String },
    numberOfMembers: { type: Number },
    numberOfMonths: { type: Number },
    technologies: { type: [String] },
    industryName: { type: String },
    title: { type: String },
    subtitle: { type: String },
  },
  { _id: false },
);

const ProjectSchema = new Schema<IProject>(
  {
    id: { type: String, unique: true, required: true },
    appName: { type: String },
    logo: { type: String },
    slug: { type: String },
    imageSrc: { type: String },
    details: {
      coloredPartTitle: { type: String },
      regularTitle: { type: String },

      heroInfo: {
        type: [HeroInfoSchema],
      },
      overviewParagraphs: { type: [String] },
      overviewImage: { type: String },
      aboutParagraph: { type: String },
      aboutInfo: {
        type: [AboutInfoSchema],
      },
      clientFeedback: {
        clientNameAndDesignation: { type: String },
        clientImage: { type: String },
        feedback: { type: String },
      },
      solution: {
        description: { type: String },
        solutionsPoints1: { type: [String] },
        solutionsPoints2: { type: [String] },
        solutionImage: { type: String },
      },
      keyFeature: {
        description: { type: String },
        keyFeaturesPoints1: { type: [String] },
        keyFeaturesPoints2: { type: [String] },
        keyFeaturesImage: { type: String },
      },
      result: {
        description: { type: String },
        resultsPoints1: { type: [String] },
        resultsPoints2: { type: [String] },
        resultImage: { type: String },
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProject & Document>("Project", ProjectSchema);

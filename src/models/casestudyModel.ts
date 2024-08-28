import mongoose, { Schema } from 'mongoose';
import { IProject } from '../types';


const ProjectSchema = new Schema<IProject>({
  id: { type: Number, required: true, unique: true  },
  appName: { type: String, required: true },
  logo: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  imageSrc: { type: String, required: true },
  coloredPartTitle: { type: String, required: true },
  regularTitle: { type: String, required: true },
  team: {
    icon:{ type: String, required: true },
    alt:{ type: String, required: true },
    numberOfMembers: { type: Number, required: true },
    description: { type: String, required: true },
  },
  sprints: {
    icon:{ type: String, required: true },
    alt:{ type: String, required: true },
    numberOfSprints: { type: Number, required: true },
    description: { type: String, required: true },
  },
  time: {
    icon:{ type: String, required: true },
    alt:{ type: String, required: true },
    numberOfMonths: { type: Number, required: true },
    description: { type: String, required: true },
  },
  overviewParagraphs: { type: String, required: true },
  overviewImage: { type: String },
  aboutParagraph: { type: String, required: true },
  technologies: { 
    icon:{ type: String, required: true },
    alt:{ type: String, required: true },
    title: { type: String, required: true },
    technologies: { type: String, required: true },
  },
  industry: {
    icon:{ type: String, required: true },
    alt:{ type: String, required: true },
    title: { type: String, required: true },
    industryName: { type: String, required: true }, 
  },
  solution: {
    description: { type: String },
    solutionsPoints1: { type: [String] },
    solutionsPoints2: { type: [String] },
    solutionImage: { type: String },
  },
  keyFeature: {
    description: { type: String, required: true },
    keyFeaturesPoints1: { type: [String] },
    keyFeaturesPoints2: { type: [String] },
    keyImage: { type: String },
  },
  result: {
    description: { type: String },
    resultsPoints1: { type: [String]},
    resultsPoints2: { type: [String]},
    resultImage: { type: String },
  },
  clientFeedback: {
    clientName: { type: String},
    clientImage: { type: String },
    clientDesignation: { type: String},
    feedback: { type: String },
  },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);

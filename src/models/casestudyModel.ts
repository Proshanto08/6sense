import mongoose, { Schema } from 'mongoose';
import { IProject } from '../types';

const ProjectSchema = new Schema<IProject>({
  appName: { type: String},
  logo: { type: String },
  slug: { type: String ,unique: true },
  imageSrc: { type: String},
  details:{
  coloredPartTitle: { type: String },
  regularTitle: { type: String },
  team: {
    icon:{ type: String, },
    alt:{ type: String, },
    numberOfMembers: { type: Number,  },
    description: { type: String, },
  },
  sprints: {
    icon:{ type: String,  },
    alt:{ type: String,  },
    numberOfSprints: { type: Number, },
    description: { type: String, },
  },
  time: {
    icon:{ type: String, },
    alt:{ type: String,  },
    numberOfMonths: { type: Number,  },
    description: { type: String, },
  },
  overviewParagraphs: { type: String, },
  overviewImage: { type: String },
  aboutParagraph: { type: String,  },
  technologies: { 
    icon:{ type: String,  },
    alt:{ type: String,  },
    title: { type: String,  },
    technologies: { type: String,  },
  },
  industry: {
    icon:{ type: String,  },
    alt:{ type: String,  },
    title: { type: String,  },
    industryName: { type: String, }, 
  },
  solution: {
    description: { type: String },
    solutionsPoints1: { type: [String] },
    solutionsPoints2: { type: [String] },
    solutionImage: { type: String },
  },
  keyFeature: {
    description: { type: String,  },
    keyFeaturesPoints1: { type: [String] },
    keyFeaturesPoints2: { type: [String] },
    keyFeaturesImage: { type: String },
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
}
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);

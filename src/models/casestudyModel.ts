import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from '../types';

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  appName: { type: String, required: true },
  logo: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  thumbImage: { type: String, required: true },
  projectOverview: { type: String, required: true },
  about: { type: String, required: true },
  coverImage: { type: String },
  clientFeedback: {
    clientName: { type: String, required: true },
    clientImage: { type: String },
    clientDesignation: { type: String, required: true },
    feedback: { type: String, required: true },
  },
  solution: {
    description: { type: String },
    solutions: { type: [String], required: true },
  },
  result: {
    description: { type: String },
    results: { type: [String], required: true },
    resultImage: { type: String },
  },
  keyFeature: {
    description: { type: String, required: true },
    features: { type: [String], required: true },
  },
  team: {
    numberOfMembers: { type: Number, required: true },
    text: { type: String, required: true },
  },
  sprints: {
    numberOfSprints: { type: Number, required: true },
    text: { type: String, required: true },
  },
  time: {
    numberOfMonths: { type: Number, required: true },
    text: { type: String, required: true },
  },
  technologies: { type: [String], required: true },
  industry: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);

import mongoose from 'mongoose';
import { config } from '../config/config';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
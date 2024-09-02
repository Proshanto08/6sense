import mongoose, { Schema, Document } from "mongoose";

export interface ITeamGallery extends Document {
  title: string;
  image: string;
}

const teamGallerySchema = new Schema<ITeamGallery>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ITeamGallery>("TeamGallery", teamGallerySchema);

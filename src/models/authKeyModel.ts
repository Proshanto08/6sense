import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthKey extends Document {
  key: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthKeySchema = new Schema({
  key: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IAuthKey>('AuthKey', AuthKeySchema);

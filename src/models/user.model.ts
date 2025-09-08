import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkSpace: mongoose.Types.ObjectId | null;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: false,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    profilePicture: {
      type: String,
      default: null
    },
    currentWorkSpace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace'
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

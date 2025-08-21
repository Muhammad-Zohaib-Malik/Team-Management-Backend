import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkSpace: mongoose.Types.ObjectId | null;
  comparePassword(value: string): Promise<boolean>;
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
    password: { type: String, select: true },

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
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
        return ret;
      }
    }
  }
);

userSchema.pre<UserDocument>('save', async function (this: UserDocument, next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  this: UserDocument,
  value: string
) {
  return bcrypt.compare(value, this.password);
};

export const User = mongoose.model<UserDocument>('User', userSchema);

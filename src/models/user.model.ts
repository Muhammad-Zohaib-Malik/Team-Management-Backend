import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkSpace: mongoose.Types.ObjectId | null;
  comparePassword(candidatePassword: string): Promise<boolean>;
  omitPassword(): Omit<UserDocument, 'password'>;
  updateLogin(): Promise<void>;
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
    password: {
      type: String,
      required: true,
      trim: true,
      select: false
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

userSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  this: UserDocument,
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.omitPassword = function (
  this: UserDocument
): Omit<UserDocument, 'password'> {
  const userObject = this.toObject() as Omit<UserDocument, 'password'> & {
    password?: string;
  };
  delete userObject.password;
  return userObject;
};

userSchema.methods.updateLogin = async function (this: UserDocument) {
  this.lastLogin = new Date();
  await this.save();
};

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

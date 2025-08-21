import mongoose, { Document, Schema } from 'mongoose';
import {
  ProviderEnumType,
  ProviderEnum
} from '../enums/account.provider.enum.js';

export interface AccountDocument extends Document {
  provider: ProviderEnumType;
  providerId: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

export const AccountSchema = new Schema<AccountDocument>(
  {
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true
    },
    providerId: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const AccountModel = mongoose.model<AccountDocument>(
  'Account',
  AccountSchema
);

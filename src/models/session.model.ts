import mongoose, { Document, Schema } from 'mongoose';

export interface SessionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const sessionSchema = new Schema<SessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600
    }
  },
  {
    timestamps: true
  }
);

export const SessionModel = mongoose.model<SessionDocument>(
  'Session',
  sessionSchema
);

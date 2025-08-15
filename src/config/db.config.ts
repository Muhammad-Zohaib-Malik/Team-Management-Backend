import mongoose from 'mongoose';
import { config } from './app.config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

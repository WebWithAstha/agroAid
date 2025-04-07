import mongoose from 'mongoose';
import { config } from '../config/config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected');

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to db');
    });

    mongoose.connection.on('error', (err) => {
      console.log(err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
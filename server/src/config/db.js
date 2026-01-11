import {configDotenv} from 'dotenv';
// Load Env Vars
configDotenv()

import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
const DB_URI = process.env.MONGO_URI

const connectDB = async () => {
    console.log(DB_URI);
    
  try {
    const conn = await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Pre-import all models to register their schemas in Mongoose
import '../models/user';
import '../models/fish';
import '../models/plant';
import '../models/equipment';
import '../models/food';
import '../models/medicine';
import '../models/disease';
import '../models/blog';
import '../models/guide';
import '../models/category';
import '../models/tag';
import '../models/comment';
import '../models/bookmark';
import '../models/faq';
import '../models/media';
import '../models/settings';
import '../models/compatibility';
import '../models/waterParameter';
import '../models/speciesGroup';
import '../models/newsletter';

const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fishversa';
    await mongoose.connect(connStr);
    console.log('MongoDB Connected successfully to:', mongoose.connection.name);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

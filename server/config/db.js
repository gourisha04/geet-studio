import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('username:password')) {
    console.warn('⚠️ MONGODB_URI is not defined or is placeholder. Server operating with resilient in-memory mode.');
    mongoose.set('bufferCommands', false);
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
      bufferCommands: false,
    });
    console.log(`🍃 MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Note: ${error.message}`);
    console.warn('⚠️ Server operating with resilient in-memory mode.');
    mongoose.set('bufferCommands', false);
    return false;
  }
};

import mongoose from 'mongoose';

let isConnected = false; //for tracking connections

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  console.log('THIS IS THE ONE');
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompts',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

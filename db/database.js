import mongoose from "mongoose";

export const database = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected");
  } catch (error) {
    console.log("database is not connected");
  }
};

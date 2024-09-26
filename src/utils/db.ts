import mongoose from "mongoose";

const mongoURI: string =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb";
mongoose.connect(mongoURI);

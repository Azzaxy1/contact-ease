import mongoose from "mongoose";

const mongoURI: string = process.env.MONGO_URI || "";

mongoose.connect(mongoURI);

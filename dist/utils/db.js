"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb";
mongoose_1.default.connect(mongoURI);

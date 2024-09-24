import express, { Response, Request } from "express";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(() => {
  console.log(`Server running on http://localhost:${PORT}`);
});

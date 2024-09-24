import express from "express";
import expressLayouts from "express-ejs-layouts";
import "dotenv/config";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

import router from "./routes/routes";

const app = express();

const PORT = process.env.PORT || 3000;

// Konfigurasi EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(expressLayouts); // Third party middleware
app.use(express.static("public")); // Built-in level middleware
app.use(express.urlencoded({ extended: true }));

// Middleware Routes
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import expressLayouts from "express-ejs-layouts";
import "dotenv/config";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";
import methodOverride from "method-override";
import path from "path";
import MongoStore from "connect-mongo";
import serverless from "serverless-http";

import "./utils/db";

import router from "./routes/routes";

const app = express();

const PORT = process.env.PORT || 3000;

// Konfigurasi EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));
app.use(expressLayouts); // Third party middleware
app.use(express.static(path.join(__dirname, "../src/public")));
app.use(express.urlencoded({ extended: true }));

// Konfigurasi Flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(flash());

// Konfigurasi method override
app.use(methodOverride("_method"));

// Middleware Routes
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export Express app as serverless function
module.exports = app;
module.exports.handler = serverless(app);

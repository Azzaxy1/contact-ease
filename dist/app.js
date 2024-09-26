"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const method_override_1 = __importDefault(require("method-override"));
const path_1 = __importDefault(require("path"));
require("./utils/db");
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Konfigurasi EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express_ejs_layouts_1.default); // Third party middleware
app.use(express_1.default.static(path_1.default.join(__dirname, "../src/public"))); // Built-in level middleware
app.use(express_1.default.urlencoded({ extended: true }));
// Konfigurasi Flash
app.use((0, cookie_parser_1.default)("secret"));
app.use((0, express_session_1.default)({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));
app.use((0, connect_flash_1.default)());
// Konfigurasi method override
app.use((0, method_override_1.default)("_method"));
// Middleware Routes
app.use("/", routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

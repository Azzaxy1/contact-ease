"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const router = express_1.default.Router();
// Halaman Home
router.get("/", contactController_1.home);
// Rute untuk halaman about
router.get("/about", contactController_1.about);
// Rute untuk halaman contact
router.get("/contact", contactController_1.contactList);
// Rute halaman form tambah data
router.get("/contact/add", contactController_1.addContactForm);
// proses tambah data contact
router.post("/contact", contactController_1.addContact);
// Prosess delete contact
router.delete("/contact", contactController_1.deleteContact);
// Form ubah data contact
router.get("/contact/edit/:nama", contactController_1.editContactForm);
// Proses Ubah Data Contact
router.put("/contact", contactController_1.updateContact);
// Rute halaman detail contact
router.get("/contact/:nama", contactController_1.detailContact);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailContact = exports.updateContact = exports.editContactForm = exports.deleteContact = exports.addContact = exports.addContactForm = exports.contactList = exports.about = exports.home = void 0;
const express_validator_1 = require("express-validator");
const contact_1 = __importDefault(require("../model/contact"));
// Halaman Home
const home = (req, res) => {
    res.render("index", {
        title: "Halaman Home",
        layout: "layouts/main-layout",
        activeRoute: "home",
    });
};
exports.home = home;
// Halaman About
const about = (req, res) => {
    res.render("about", {
        title: "Halaman About",
        layout: "layouts/main-layout",
        activeRoute: "about",
    });
};
exports.about = about;
// Halaman contact
const contactList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield contact_1.default.find();
    res.render("contact", {
        title: "Halaman Contact",
        layout: "layouts/main-layout",
        contacts,
        activeRoute: "contact",
        //* Gunakan flash
        msg: req.flash("msg"),
    });
});
exports.contactList = contactList;
// Halaman form tambah data
const addContactForm = (req, res) => {
    res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        activeRoute: "contact",
    });
};
exports.addContactForm = addContactForm;
// proses tambah data contact
exports.addContact = [
    (0, express_validator_1.body)("nama").custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const duplicate = yield contact_1.default.findOne({ nama: value });
        if (duplicate) {
            throw new Error("Nama contact sudah terdaftar!");
        }
        return true;
    })),
    (0, express_validator_1.check)("email", "Email tidak valid!").isEmail(),
    (0, express_validator_1.check)("nohp").isMobilePhone("id-ID").withMessage("No HandPhone tidak valid!"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render("add-contact", {
                title: "Form Tambah Data Contact",
                layout: "layouts/main-layout",
                activeRoute: "contact",
                errors: errors.array(),
                success: "Data berhasil dimasukan",
            });
        }
        else {
            yield contact_1.default.insertMany(req.body);
            // kirimkan flash message
            req.flash("msg", "Data contact berhasil ditambahkan!");
            res.redirect("/contact");
        }
    }),
];
// Prosess delete contact
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield contact_1.default.deleteOne({ nama: req.body.nama });
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
});
exports.deleteContact = deleteContact;
// Form ubah data contact
const editContactForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_1.default.findOne({ nama: req.params.nama });
    res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout",
        activeRoute: "contact",
        contact,
    });
});
exports.editContactForm = editContactForm;
// Proses Ubah Data Contact
exports.updateContact = [
    (0, express_validator_1.body)("nama").custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const duplicate = yield contact_1.default.findOne({ nama: value });
        if (value !== req.body.oldNama && duplicate) {
            throw new Error("Nama contact sudah terdaftar!");
        }
        return true;
    })),
    (0, express_validator_1.check)("email", "Email tidak valid!").isEmail(),
    (0, express_validator_1.check)("nohp").isMobilePhone("id-ID").withMessage("No HandPhone tidak valid!"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.render("edit-contact", {
                title: "Form Ubah Data Contact",
                layout: "layouts/main-layout",
                activeRoute: "contact",
                errors: errors.array(),
                success: "Data berhasil dimasukan",
                contact: req.body,
            });
        }
        else {
            yield contact_1.default.updateOne({ _id: req.body._id }, {
                $set: {
                    nama: req.body.nama,
                    email: req.body.email,
                    nohp: req.body.nohp,
                },
            });
            req.flash("msg", "Data contact berhasil diubah!");
            res.redirect("/contact");
        }
    }),
];
// Halaman detail contact
const detailContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.nama;
    const contact = yield contact_1.default.findOne({ nama: params });
    res.render("detail", {
        title: "Detail Contact",
        layout: "layouts/main-layout",
        contact,
        params,
        activeRoute: "contact",
    });
});
exports.detailContact = detailContact;

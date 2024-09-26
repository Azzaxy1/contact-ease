import express from "express";
import {
  about,
  addContact,
  addContactForm,
  contactList,
  deleteContact,
  detailContact,
  editContactForm,
  home,
  updateContact,
} from "../controllers/contactController";

const router = express.Router();

// Halaman Home
router.get("/", home);

// Rute untuk halaman about
router.get("/about", about);

// Rute untuk halaman contact
router.get("/contact", contactList);

// Rute halaman form tambah data
router.get("/contact/add", addContactForm);

// proses tambah data contact
router.post("/contact", addContact);

// Prosess delete contact
router.delete("/contact", deleteContact);

// Form ubah data contact
router.get("/contact/edit/:nama", editContactForm);

// Proses Ubah Data Contact
router.put("/contact", updateContact);

// Rute halaman detail contact
router.get("/contact/:nama", detailContact);

export default router;

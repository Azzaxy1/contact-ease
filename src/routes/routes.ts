import express, { Request, Response } from "express";
import { body, validationResult, check } from "express-validator";

import Contact from "../model/contact";

const router = express.Router();

// Halaman Home
router.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Halaman Home",
    layout: "layouts/main-layout",
    activeRoute: "home",
  });
});

// Rute untuk halaman about
router.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
    activeRoute: "about",
  });
});

// Rute untuk halaman contact
router.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    activeRoute: "contact",
    //* Gunakan flash
    msg: req.flash("msg"),
  });
});

// Rute halaman form tambah data
router.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
    activeRoute: "contact",
  });
});

// proses tambah data contact
router.post(
  "/contact",
  body("nama").custom(async (value: string) => {
    const duplicate = await Contact.findOne({ nama: value });
    if (duplicate) {
      throw new Error("Nama contact sudah terdaftar!");
    }

    return true;
  }),
  check("email", "Email tidak valid!").isEmail(),
  check("nohp").isMobilePhone("id-ID").withMessage("No HandPhone tidak valid!"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        activeRoute: "contact",
        errors: errors.array(),
        success: "Data berhasil dimasukan",
      });
    } else {
      await Contact.insertMany(req.body);

      // kirimkan flash message
      req.flash("msg", "Data contact berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// Rute halaman detail contact
router.get("/contact/:nama", async (req, res) => {
  const params = req.params.nama;
  const contact = await Contact.findOne({ nama: params });

  res.render("detail", {
    title: "Detail Contact",
    layout: "layouts/main-layout",
    contact,
    params,
    activeRoute: "contact",
  });
});

export default router;

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

// Prosess delete contact (diatas detail)
router.delete("/contact", async (req, res) => {
  await Contact.deleteOne({ nama: req.body.nama });
  req.flash("msg", "Data contact berhasil dihapus!");
  res.redirect("/contact");
});

// Form ubah data contact
router.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    activeRoute: "contact",
    contact,
  });
});

// Process update data contact
router.post(
  "/contact/update",
  body("nama").custom(async (value, { req }) => {
    const duplicate = await Contact.findOne({ nama: value });
    if (value !== req.body.oldNama && duplicate) {
      throw new Error("Nama contact sudah terdaftar!");
    }
    return true;
  }),
  check("email", "Email tidak valid!").isEmail(),
  check("nohp").isMobilePhone("id-ID").withMessage("No HandPhone tidak valid!"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout",
        activeRoute: "contact",
        errors: errors.array(),
        success: "Data berhasil dimasukan",
        contact: req.body,
      });
    } else {
      console.log(req.body);
      await Contact.updateOne({ nama: req.body.oldNama }, req.body);

      req.flash("msg", "Data contact berhasil diubah!");
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

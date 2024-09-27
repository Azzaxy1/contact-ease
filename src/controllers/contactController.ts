import { Request, Response } from "express";
import { body, validationResult, check } from "express-validator";
import Contact from "../model/contact";

// Halaman Home
export const home = (req: Request, res: Response) => {
  res.render("../views/index.ejs", {
    title: "Halaman Home",
    layout: "layouts/main-layout",
    activeRoute: "home",
  });
};

// Halaman About
export const about = (req: Request, res: Response) => {
  res.render("../views/about.ejs", {
    title: "Halaman About",
    layout: "layouts/main-layout",
    activeRoute: "about",
  });
};

// Halaman contact
export const contactList = async (req: Request, res: Response) => {
  const contacts = await Contact.find();

  res.render("../views/contact.ejs", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    activeRoute: "contact",
    //* Gunakan flash
    msg: req.flash("msg"),
  });
};

// Halaman form tambah data
export const addContactForm = (req: Request, res: Response) => {
  res.render("../views/add-contact.ejs", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
    activeRoute: "contact",
  });
};

// proses tambah data contact
export const addContact = [
  body("nama").custom(async (value: string) => {
    const duplicate = await Contact.findOne({ nama: value });
    if (duplicate) {
      throw new Error("Nama contact sudah terdaftar!");
    }

    return true;
  }),
  check("email", "Email tidak valid!").isEmail(),
  check("nohp").isMobilePhone("id-ID").withMessage("No HandPhone tidak valid!"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("../views/add-contact.ejs", {
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
  },
];

// Prosess delete contact
export const deleteContact = async (req: Request, res: Response) => {
  await Contact.deleteOne({ nama: req.body.nama });
  req.flash("msg", "Data contact berhasil dihapus!");
  res.redirect("/contact");
};

// Form ubah data contact
export const editContactForm = async (req: Request, res: Response) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("../views/edit-contact.ejs", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    activeRoute: "contact",
    contact,
  });
};

// Proses Ubah Data Contact
export const updateContact = [
  body("nama").custom(async (value, { req }) => {
    const duplicate = await Contact.findOne({ nama: value });
    if (value !== req.body.oldNama && duplicate) {
      throw new Error("Nama contact sudah terdaftar!");
    }
    return true;
  }),
  check("email", "Email tidak valid!").isEmail(),
  check("nohp").isMobilePhone("id-ID").withMessage("No HandPhone tidak valid!"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("../views/edit-contact.ejs", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout",
        activeRoute: "contact",
        errors: errors.array(),
        success: "Data berhasil dimasukan",
        contact: req.body,
      });
    } else {
      await Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      );

      req.flash("msg", "Data contact berhasil diubah!");
      res.redirect("/contact");
    }
  },
];

// Halaman detail contact
export const detailContact = async (req: Request, res: Response) => {
  const params = req.params.nama;
  const contact = await Contact.findOne({ nama: params });

  res.render("../views/detail.ejs", {
    title: "Detail Contact",
    layout: "layouts/main-layout",
    contact,
    params,
    activeRoute: "contact",
  });
};

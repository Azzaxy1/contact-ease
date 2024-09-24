import express, { Request, Response } from "express";
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

export default router;

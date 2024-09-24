import express, { Request, Response } from "express";

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

export default router;

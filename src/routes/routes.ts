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

export default router;

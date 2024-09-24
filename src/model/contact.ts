import mongoose from "mongoose";

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    nama: {
      type: String,
      required: true,
    },
    nohp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
  })
);

export default Contact;

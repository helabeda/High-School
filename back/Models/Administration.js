const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin"],
    default: "admin",
  },
});

module.exports = Administration = mongoose.model("administration", adminSchema);

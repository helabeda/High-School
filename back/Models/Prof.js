const mongoose = require("mongoose");

const profSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  matiere: {
    type: String,
  },
  classes: [
     String
  ],
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: { 
    type: String, enum: ["prof"], default: "prof" 
  },
});

module.exports = Prof = mongoose.model("prof", profSchema);


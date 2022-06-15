const mongoose = require("mongoose");

const eleveSchema = new mongoose.Schema({
  identifiant: {
    type: String,
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  classe: {
    type: String,
  },
  abscence: {
    type: Boolean,
    default: false,
  },
  billet: [
    {
      admin: { type: mongoose.Schema.Types.ObjectId },
      date: { type: Date, default: new Date() },
    },
  ],
  exclu: [
    {
      prof: { type: mongoose.Schema.Types.ObjectId },
      description: { type: String, default: "" },
      seanceDate: { type: String },
      date: { type: Date, default: new Date() },
      //"8h-9h-12-24-2021"
    },
  ],
});

module.exports = Eleve = mongoose.model("eleve", eleveSchema);

const mongoose = require("mongoose");

const registreSchema = new mongoose.Schema({
  eleves: [
    {
      eleve: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "eleve" },
      status: { type: String, enum: [ "present","absent","exclu"], default:"present"},
    },
  ],
  prof: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "prof" },
  matiere: {
    type: String,
  },
  classe: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = Registre = mongoose.model("registre", registreSchema);

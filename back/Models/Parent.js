const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  identifiant: {
    type: String,
  },
  password: {
    type: String,
  },
  nom:{
    type:String
  },
  prenom:{
    type:String
  },
  number:{
    type:String
  },
  role: {
    type: String,
    enum: ["parent"],
    default: "parent",
  },
});

module.exports = Parent = mongoose.model("parent", parentSchema);

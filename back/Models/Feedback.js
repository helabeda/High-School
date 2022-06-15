const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  parent: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "parent" },
  feedback: {
    type: String,
  },
  response:{
    type: String,
  }
});

module.exports = Feedback = mongoose.model("feedback", feedbackSchema);

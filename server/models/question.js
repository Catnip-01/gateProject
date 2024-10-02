const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  year: { type: Number, required: true },
  correctOption: { type: String, required: true },
  question: { type: String, required: true },
  subject: { type: String, required: true },
});

module.exports = mongoose.model("gateQuestion", questionSchema);

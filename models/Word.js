const mongoose = require("mongoose");

const WordSchema = mongoose.Schema({
  wordID: {
    type: String,
    required: [true, "please enter a word"],
    lowercase: true,
    trim: true,
    unique: true,
  },
  text: String,
  defData: Array,
  memorized: { type: Boolean, default: false },
});

module.exports = mongoose.model("Word", WordSchema);

const mongoose = require("mongoose");

const WordSchema = mongoose.Schema({
  wordID: {
    type: String,
    requires: [true, "please enter a word"],
    lowercase: true,
  },
  text: String,
  defData: Array,
});

module.exports = mongoose.model("Word", WordSchema);

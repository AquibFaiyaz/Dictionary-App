const express = require("express");

const router = express.Router();

const {
  postWordDB,
  getAllWords,
  deleteWord,
  updateWord,
} = require("../controllers/words");

router.post("/", postWordDB);

router.get("/", getAllWords);

router.delete("/:id", deleteWord);

router.patch("/:id", updateWord);

module.exports = router;

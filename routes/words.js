const express = require("express");

const router = express.Router();

const { postWordDB, getAllWords } = require("../controllers/words");

router.post("/", postWordDB);

router.get("/", getAllWords);

module.exports = router;

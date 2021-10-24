const express = require("express");

const router = express.Router();

const { postWordDB } = require("../controllers/words");

router.post("/", postWordDB);

module.exports = router;

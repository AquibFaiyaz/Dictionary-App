const Word = require("../models/Word");
const getDictWord = require("../data");

const postWordDB = async (req, res) => {
  const { wordID } = req.body;
  if (!wordID) {
    return res.status(201).json({ msg: "Please enter a word" });
  }
  getDictWord(wordID)
    .then(async (response) => {
      const { text, senses } = response;
      const defData = senses.map((entry) => {
        const { definitions, subsenses } = entry;

        if (subsenses !== undefined) {
          const subDefinitions = subsenses.map((subdef) => {
            return subdef.definitions[0];
          });
          return { definitions: definitions[0], subDefinitions };
        }

        return { definitions: definitions[0], subDefinitions: [] };
      });
      const word = await Word.create({ wordID, text, defData });
      res.status(201).json({ msg: "added successfully" });
    })
    .catch((error) => {
      res.status(404).json({ success: false, msg: "word not found." });
    });
};

const getAllWords = async (req, res) => {
  try {
    const data = await Word.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ success: false, msg: "unable to fetch data" });
  }
};

module.exports = { postWordDB, getAllWords };

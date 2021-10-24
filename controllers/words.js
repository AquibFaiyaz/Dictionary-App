const Word = require("../models/Word");
const getDictWord = require("../data");

const postWordDB = async (req, res) => {
  const { wordID } = req.body;

  getDictWord(wordID).then(async (response) => {
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
    res.status(201).json(word);
  });
};

module.exports = { postWordDB };
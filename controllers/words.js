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
      res.status(201).json({ msg: "added successfully", word });
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

const deleteWord = async (req, res) => {
  try {
    const { id: wordID } = req.params;
    // console.log(req.params);
    const word = await Word.findOneAndDelete({ _id: wordID });
    if (!word) {
      return res.status(404).json({ msg: `no word with id : ${taskID}` });
    }
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "no word found" });
  }
};

const updateWord = async (req, res) => {
  try {
    const { id: wordID } = req.params;
    //console.log(req.body);
    const word = await Word.findOneAndUpdate({ _id: wordID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!word) {
      return res.status(404).json({ msg: "No word found" });
    }
    if (word.memorized === true) {
      res.status(200).json({ msg: "Excellent! You are learning fastly." });
    } else {
      res.status(200).json({ msg: "Keep it up :-)" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { postWordDB, getAllWords, deleteWord, updateWord };

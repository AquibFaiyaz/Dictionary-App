const axios = require("axios");
require("dotenv").config();

const getDictWord = async (wordID) => {
  const app_id = process.env.APP_ID;
  const app_key = process.env.APP_KEY;
  const fields = "definitions";
  const response = await axios({
    method: "get",
    url: `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${wordID}?fields=${fields}&strictMatch=false`,
    headers: {
      app_id: app_id,
      app_key: app_key,
    },
  });
  const { text } = await response.data.results[0].lexicalEntries[0]
    .lexicalCategory;
  const { senses } = await response.data.results[0].lexicalEntries[0]
    .entries[0];
  // console.log({ text, senses });
  return { text, senses };
};
// getDictWord("rule").then((data) => {
//   const { text, senses } = data;
//   console.log(data);
// });

module.exports = getDictWord;

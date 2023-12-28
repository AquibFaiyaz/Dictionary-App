const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const cors = require("cors");

const words = require("./routes/words");
require("dotenv").config();

const app = express();

app.use(express.static("../client/dictionary/public"));

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/dictionary", words);

const url = process.env.MONGO_URI;
const port = process.env.PORT || 8000;
const start = async ({ dbConnectUrl, apiPort }) => {
  try {
    await connectDB(dbConnectUrl);
    app.listen(apiPort, "212.227.243.53", () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start({ apiPort: port, dbConnectUrl: url });

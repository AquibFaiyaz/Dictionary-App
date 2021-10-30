const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");

const words = require("./routes/words");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/dictionary", words);

const url = process.env.MONGO_URI;
const port = process.env.port || 8000;
const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log("server listening on port 8000...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

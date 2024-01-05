const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db/connect");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const words = require("./routes/words");
require("dotenv").config();

const app = express();

app.use(express.static("../client/dictionary/public"));

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/dictionary", words);

const options = {
  cert: fs.readFileSync("/etc/ssl/certificate.crt"),
  ca: fs.readFileSync("/etc/ssl/ca_bundle.crt"),
  key: fs.readFileSync("/etc/ssl/private/private.key"),
};

// Create an HTTPS server and listen on port 3000
const server = https.createServer(options, app);

const url = process.env.MONGO_URI;
const port = process.env.PORT || 8000;
const start = async ({ dbConnectUrl, apiPort }) => {
  try {
    await connectDB(dbConnectUrl);
    server.listen(apiPort, "212.227.243.53", () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start({ apiPort: port, dbConnectUrl: url });

const express = require("express");
const path = require("path");
require("dotenv").config();

const Repository = require("./lib/Repository");
const bodyParser = require("./lib/bodyParser");

const authRoute = require("./routes/authRoute");
const callbackRoute = require("./routes/callbackRoute");

const server = express();

server.use(bodyParser);
server.use(express.static(path.join(__dirname, "public")));

const repository = new Repository();

server.post("/api/v1/quicksocket/auth", authRoute(repository));
server.post("/api/v1/quicksocket/callback", callbackRoute(repository));

server.get("*", (req, res) => {
  res.sendFile(path.resolve("server/public/index.html"));
});

module.exports = server;

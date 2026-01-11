const express = require('express');
const app = express();
const expressError = require("./expressError");

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  }
  throw new expressError(401,"ACCESS DENIED");
};

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/api", checkToken, (req, res, next) => {
  res.send("data");
  next();
});

app.get("/random", (req, res) => {
  res.send("Random page");
});

module.exports = app;
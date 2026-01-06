const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log("Hi I am middleware");
    next();
});

app.use((req, res, next) => {
  console.log("Hi I am 2nd middleware");
  next();
});

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/random", (req, res) => {
  res.send("Random page");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

module.exports = app;
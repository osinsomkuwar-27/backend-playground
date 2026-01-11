const express = require('express');
const app = express();
const expressError = require("./expressError");

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

app.use((err, req, res, next) => {
  let {status = 500, message = "Some error occured"} = err;
  res.status(status).send(message);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

module.exports = app;
const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/rolldice", (req, res) => {
  res.render("rolldice.ejs");
});

app.get("/ig/:username", (req, res) => {
    let {username} = req.params;
    const instadata = require("./data.json");
    const data = instadata[username];
    console.log(data);
    res.render("instagram.ejs",{data});
});

app .listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
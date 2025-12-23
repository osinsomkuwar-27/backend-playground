const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4:uuidv4} = require("uuid");
uuidv4();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "osin",
    content: "personal",
  },
  {
    id: uuidv4(),
    username: "ojas",
    content: "personal",
  },
  {
    id: uuidv4(),
    username: "shreeja",
    content: "public",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req,res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  posts.push({ id: uuidv4(), username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log("Requested ID:", id);
  console.log("All posts:", posts);

  let post = posts.find((p) => id === p.id);

  if (!post) {
    return res.send("Post not found !");
  }

  res.render("show.ejs", { post });
});


app.listen(port, () => {
  console.log("Listening on port : 8080");
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Database Connection

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
  console.log("Connected to MongoDB");
}

//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

/// Create Route
app.post("/chats", (req, res) => {
  try {
    let { from, to, msg } = req.body;

    let newChat = new Chat({
      from,
      to,
      msg,
      created_at: new Date(),
    });

    newChat
      .save()
      .then((res) => {
        console.log("Chat saved successfully");
      })
      .catch((err) => {
        console.log("Error saving chat:", err);
      });
    res.redirect("/chats");
  } catch (err) {
    console.log(err);
    res.send("Error creating chat.");
  }
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Update Route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  res.redirect("/chats");
});

//Home Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const Chat = require("./models/chat.js");

app.set("view engine", "ejs");

main().then(() => {
    console.log("Database connected successfully");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log("Connected to MongoDB");
}

let chat1 = new Chat({
    from: "Alice",
    to: "Bob",
    msg: "Hello Bob!",
    created_at: new Date() //helps in createing some random date 
});

chat1.save().then(res =>{
    console.log(res)
}).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

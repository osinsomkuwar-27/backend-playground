const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const ejs = require('ejs');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main().then(() => {
    console.log("Database connected successfully");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log("Connected to MongoDB");
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

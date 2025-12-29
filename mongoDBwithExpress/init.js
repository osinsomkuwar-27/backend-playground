const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then(() => {
    console.log("Database connected successfully");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log("Connected to MongoDB");
}

let allChats =[
  {
    from: "Alice",
    to: "Bob",
    msg: "Hello Bob!",
    created_at: new Date()
  },
  {
    from: "Bob",
    to: "Alice",
    msg: "Hey Alice! How are you?",
    created_at: new Date()
  },
  {
    from: "Charlie",
    to: "Alice",
    msg: "Are we still meeting today?",
    created_at: new Date()
  },
  {
    from: "Alice",
    to: "Charlie",
    msg: "Yes, see you at 5 PM.",
    created_at: new Date()
  },
  {
    from: "Bob",
    to: "Charlie",
    msg: "Don't forget to bring the documents.",
    created_at: new Date()
  }
];

Chat.insertMany(allChats).then(() => {
    console.log("Data inserted successfully");
}).catch(err => {
    console.log("Error inserting data: ", err);
});
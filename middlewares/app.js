const express = require("express");
const app = express();

// app.use((req, res, next) => {
//     console.log("Hi I am middleware");
//     next();
// });

// app.use((req, res, next) => {
//   console.log("Hi I am 2nd middleware");
//   next();
// });

// //logger middleware
// app.use((req, res, next) =>{
//   req.time = new Date (Date.now());
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });

const checkToken = (req,res,next) =>{
  let { token } = req.query;
  if(token === "giveaccess"){
  next();
} 
res.send("ACCESS DENIED");
};

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/api", checkToken, (req, res, next) =>{
  res.send("data");
  next();
})

app.get("/random", (req, res) => {
  res.send("Random page");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

module.exports = app;
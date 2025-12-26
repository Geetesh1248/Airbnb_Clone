const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
}

main().then((res) => {
  console.log("successfully connected : ");
});

app.get("/", (req, res) => {
  res.send("Working on it");
});

// Server started
app.listen(8080, () => {
  console.log("server is listening to port : 8080");
});

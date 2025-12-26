const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
}

main()
  .then((res) => {
    console.log("successfully connected : ");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Working on it");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved ");
//   res.send("successful  testing ");
// });

// Server started
app.listen(8080, () => {
  console.log("server is listening to port : 8080");
});

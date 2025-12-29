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

//HOME ROUTE
app.get("/", (req, res) => {
  res.send("Working on it");
});

//INDEX ROUTE
app.get("/listings", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
});

//SHOW ROUTE
app.get("/listings/:id", async (req, res) => {
  let {id}=req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});


// Server started
app.listen(8080, () => {
  console.log("server is listening to port : 8080");
});

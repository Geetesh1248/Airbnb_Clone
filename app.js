const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");
const { count } = require("console");

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
app.get("/listing", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
});

//NEW ROUTE
app.get("/listing/new", async (req, res) => {
  res.render("listings/new.ejs");
});

//CREATE ROUTE
app.post("/listing", async (req, res) => {
  // 1. Extract data from the form (req.body)
  // We can pass req.body directly if input names match Schema keys
  const newListing = new Listing(req.body);

  // 2. Save to MongoDB
  await newListing.save();
  
  console.log("Data saved successfully!");
  
  // 3. Redirect AFTER saving
  res.redirect("/listing");
});

//SHOW ROUTE
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Server started
app.listen(8080, () => {
  console.log("server is listening to port : 8080");
});

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override"); // FIX 5: Import this
const Listing = require("./models/listing.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // FIX 5: Use this to allow PUT requests

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb");
}

main()
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Working on it");
});

// INDEX ROUTE
app.get("/listing", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
});

// NEW ROUTE
app.get("/listing/new", (req, res) => {
  res.render("listings/new.ejs");
});

// CREATE ROUTE
app.post("/listing", async (req, res) => {
  // We expect data like listing[title], listing[price]...
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
});

// SHOW ROUTE
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// EDIT ROUTE
app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// UPDATE ROUTE
app.put("/listing/:id", async (req, res) => {
  let { id } = req.params;
  // This takes the object { title: "...", price: "..." } and updates DB
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/`);
});

app.listen(8080, () => {
  console.log("server is listening to port : 8080");
});

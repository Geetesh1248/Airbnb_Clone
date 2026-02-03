const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override"); // FIX 5: Import this
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { error } = require("console");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // FIX 5: Use this to allow PUT requests
app.engine("ejs", ejsMate);

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
app.get(
  "/listing",
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
  }),
);

// NEW ROUTE
app.get("/listing/new", (req, res) => {
  res.render("listings/new.ejs");
});

// CREATE ROUTE
app.post(
  "/listing",
  wrapAsync(async (req, res) => {
    // DEBUGGING: Print what the server received
    console.log(req.body);

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
  }),
);

// SHOW ROUTE
// At the top of your app.js, make sure mongoose is imported
// const mongoose = require("mongoose");

app.get(
  "/listing/:id",
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;

    // FIX: Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If not valid, throw a 404 error immediately
      return next(new ExpressError(404, "Page not Found"));
    }

    const listing = await Listing.findById(id);

    // Also check if listing exists, just in case a valid ID was deleted
    if (!listing) {
      return next(new ExpressError(404, "Listing not Found"));
    }

    res.render("listings/show.ejs", { listing });
  }),
);

// EDIT ROUTE
app.get(
  "/listing/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }),
);

// UPDATE ROUTE
app.put(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // This takes the object { title: "...", price: "..." } and updates DB
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/`);
  }),
);

//DELETE ROUTE
app.delete(
  "/listing/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect(`/listing/`);
  }),
);

// Change the "*" string to a /(.*)/ Regular Expression
app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong!" } = err;
  
  // FIX: Change .send(message) to .render("error.ejs", { err })
  res.status(status).render("listings/error.ejs", { err });
});

app.listen(8080, () => {
  console.log("server is listening to port : 8080");
});

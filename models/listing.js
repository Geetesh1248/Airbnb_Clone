const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  
  // FIX: Change 'image' from String to an Object definition
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://unsplash.com/photos/brown-and-white-concrete-house-near-green-trees-under-blue-sky-during-daytime-U6Q6zVDgmSs",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/brown-and-white-concrete-house-near-green-trees-under-blue-sky-during-daytime-U6Q6zVDgmSs"
          : v,
    },
  },
  
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
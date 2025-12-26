const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    set: (v) => {
      v === ""
        ? "https://unsplash.com/photos/brown-and-white-concrete-house-near-green-trees-under-blue-sky-during-daytime-U6Q6zVDgmSs"
        : v;
    },
  },
  price: String,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

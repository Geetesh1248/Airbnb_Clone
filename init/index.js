const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("../models/listing.js");
const initData = require("../init/data.js");

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

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialised");
};

initDB()
  .then((res) => {
    console.log("done");
  })
  .catch((err) => {
    console.log(err);
  });

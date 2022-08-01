const mongoose = require("mongoose");

const Catalog = mongoose.model(
  "Catalog",
  new mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    price: Number,
    stock: Number,
    image: String,
      
  }),"Catalog"
);
module.exports = Catalog;

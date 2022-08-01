const { ObjectID } = require("bson");
const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    name: String,
    items: [
      {
        id: ObjectID,
        name: String,
        qty: Number,
      }
    ]
  }),"Cart"
);
module.exports = Cart;

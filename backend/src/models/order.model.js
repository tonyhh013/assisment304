const mongoose = require("mongoose");
const { ObjectID } = require("bson");
const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    name: String,
    seq: Number,
    orderId: String,
    date: String,
    createTime: Date,
    modifyTime: Date,
    total: Number,
    address: String,
    status: String,
    paymentId: String,
    items: [
      {
        id: ObjectID,
        qty: Number,
        detail : {
          name: String,
          desc: String,
          price: Number,
          image: String,
        },
        subtotal: Number,
      }
    ]
  }),"Order"
);

module.exports = Order;

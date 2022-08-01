const mongoose = require("mongoose");

const User = mongoose.model(
  "Users",
  new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    role: String,
    age: Number,
  }),"Users"
);

module.exports = User;

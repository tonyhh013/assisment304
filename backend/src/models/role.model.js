const mongoose = require("mongoose");

const Role = mongoose.model(
  "testa",
  new mongoose.Schema({
    name: String
  }),"testa"
);

module.exports = Role;

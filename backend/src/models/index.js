const mongoose=require('mongoose');
mongoose.Promise = global.Promise;
const db={};
db.mongoose=mongoose;
db.user = require("./user.model");
db.catalog = require("./catalog.model");
db.cart = require("./cart.model");
db.order = require("./order.model");

module.exports = db;
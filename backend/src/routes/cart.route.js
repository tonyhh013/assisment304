const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


const cu = require("../utils/upload");

//router.get('/getall', awaitHandlerFactory(cartController.getAllItems)); 
//router.get('/getname/:name', awaitHandlerFactory(cartController.getItemByName));
router.get('/get',auth(), awaitHandlerFactory(cartController.getItem));

router.put('/updateCartQTY',auth(), awaitHandlerFactory(cartController.updateCartQTY));
router.put('/AddArrayCart',auth(), awaitHandlerFactory(cartController.AddArrayCart));
router.put('/RemoveArrayCart',auth(), awaitHandlerFactory(cartController.RemoveArrayCart));

router.post('/createCart',auth(), awaitHandlerFactory(cartController.createCart));
router.delete('/deleteCart',auth(), awaitHandlerFactory(cartController.deleteCart));

module.exports = router;
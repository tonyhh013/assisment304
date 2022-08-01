const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


const cu = require("../utils/upload");

//router.get('/getall', awaitHandlerFactory(orderController.getAllItems)); 
router.get('/getOrder', auth(), awaitHandlerFactory(orderController.getOrder));
router.get('/getOrderId/:id', auth(), awaitHandlerFactory(orderController.getOrderId));
//router.get('/getname/:name', awaitHandlerFactory(orderController.getUserByName));
router.post('/createOrder', auth(),  awaitHandlerFactory(orderController.createOrder));
router.put('/payment', auth(),  awaitHandlerFactory(orderController.payment));



module.exports = router;
const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalog.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


const cu = require("../utils/upload");

router.get('/getall', awaitHandlerFactory(catalogController.getAllItems)); 
router.get('/getid/:id', awaitHandlerFactory(catalogController.getItemByid));
module.exports = router;
const express = require('express');
const auth = require('../middleware/auth.middleware');
const router = express.Router();
const manageController = require('../controllers/manage.controller');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


const cu = require("../utils/upload");

router.get('/getAllCatalog',auth('admin'), awaitHandlerFactory(manageController.getAllCatalog)); 
router.get('/getCatalogById/:id',auth('admin'), awaitHandlerFactory(manageController.getCatalogById)); 
router.get('/getAllOrder',auth('admin'), awaitHandlerFactory(manageController.getAllOrder)); 
router.get('/getOrderById/:id',auth('admin'), awaitHandlerFactory(manageController.getOrderById)); 
router.put('/updateCatalog',auth('admin'), cu.upload.single('image'),awaitHandlerFactory(manageController.updateCatalog)); 
router.post('/createCatalog',auth('admin'), cu.upload.single('image'),awaitHandlerFactory(manageController.createCatalog)); 
router.put('/updateOrder',auth('admin'),awaitHandlerFactory(manageController.updateOrder)); 
router.delete('/deleteCatalog',auth('admin'),awaitHandlerFactory(manageController.deleteCatalog)); 


module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const passport = require("passport");

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


const cu = require("../utils/upload");

//router.get('/test', awaitHandlerFactory(userController.test)); 
//router.get('/testid/:id', awaitHandlerFactory(userController.getUserById)); 
//router.get('/testname/:name', awaitHandlerFactory(userController.getUserByName)); 
//router.patch('/update/:id', awaitHandlerFactory(userController.updateUser)); 
//router.get('/delete/:id', awaitHandlerFactory(userController.deleteUser)); 

//router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); 

router.post('/createUser',createUserSchema, awaitHandlerFactory(userController.createUser));
router.post('/login',validateLogin, awaitHandlerFactory(userController.userLogin));
//router.post('/loginGoogle',validateLogin, awaitHandlerFactory(userController.loginGoogle)); 
//router.post('/upload', cu.upload.single('icon')); // localhost:3000/api/v1/users/test
//router.post('/upload', cu.upload.single('icon'),awaitHandlerFactory(userController.upload)); // localhost:3000/api/v1/users/test
//router.post('/uploads', cu.upload.array('icon', 12)); // localhost:3000/api/v1/users/test

//router.get('/download/:file(*)', awaitHandlerFactory(userController.download)); // localhost:3000/api/v1/users/test

//router.get('/getcart', awaitHandlerFactory(userController.getCart));

module.exports = router;
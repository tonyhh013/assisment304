const db = require("../models");
const User = db.user;
const Cart = db.Cart;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { check,validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');
const cu = require("../utils/upload");
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const port = Number(process.env.PORT || 3332);
const passport = require("passport");


// exports.deleteUser = async (req, res) => {
//     try{
//         //const data = Role.find();
//         const data = await User.findByIdAndUpdate({
//             id: req.params.id
//         });
//         if (!data) {
//             throw new HttpException(404, 'User not found');
//         }
//         res.send(data);
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// };
exports.createUser = async (req, res, next) => {
    const { email} = req.body;
    checkValidation(req);
    await hashPassword(req);
    let findId= await User.aggregate([{$sort:{id:-1}}, {$limit:1}])
    var id = 1;
    if (findId.length != 0){
        id = findId[0].id+1;
    }
    const user = await User.findOne({ username:email });
    if (!user) {
        const data=await new User({
            id: id,
            username: req.body.email,
            role:"user",
            password: req.body.password,
          }).save();
    
        if (!data) {
            throw new HttpException(500, 'Something went wrong');
        }
        console.log("[POST] user register")
    
        res.send({ 
            username: req.body.email,
          });
    } else {
        throw new HttpException(401, 'User already exist!');
    }
    
};
exports.userLogin = async (req, res, next) => {
    checkValidation(req);

    const { username, password: pass } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        throw new HttpException(401, 'Unable to login!');
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
        throw new HttpException(401, 'Incorrect password!');
    }

    // user matched!
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ user_id: user._id.toString(), role: user.role.toString() }, secretKey);
    // const token = jwt.sign({ user_id: user._id.toString(), role: user.role.toString() }, secretKey, {
    //     expiresIn: '24h'
    // });

    const { password, ...userWithoutPassword } = user;
    console.log("[POST] user login")

    res.send({ 
        id: user._id,
        username: user.username,
        role: user.role,
        token: token
      });
};
// exports.loginGoogle  = async (req, res, next) => {
//     const mail = req.body.mail;
//     var user = await User.findOne({ username:mail });
//     if (!user) {
//         let findId= await User.aggregate([{$sort:{id:-1}}, {$limit:1}])
//         var id = 1;
//         if (findId.length != 0){
//             id = findId[0].id+1;
//         }
//         const data=await new User({
//             id: id,
//             username: mail,
//             role:"user",
//             password: "",
//           }).save();
//           user = await User.findOne({ username:mail });
//     }
//     const secretKey = process.env.SECRET_JWT || "";
//     const token = jwt.sign({ user_id: user._id.toString(), role: user.role.toString() }, secretKey);
//     const { password, ...userWithoutPassword } = user;
//     res.send({ 
//         id: user._id,
//         username: user.email,
//         role: user.role,
//         token: token
//       });
// };
// exports.upload = async (req, res, next) => {
//     const file = req.file;

    
//      return res.send({ message: 'File uploaded successfully.' });
// };
// exports.download = async (req, res, next) => {
//     var file = req.params.file;
//     var fileLocation = path.join('./src/images',file);
//     if (fs.existsSync(path)) {
//         res.download(fileLocation, file);
//     } else {
//         res.status(500).json({message: 'dont try angin'})
//     }
    
// };
// exports.getCurrentUser = async (req, res, next) => {
//     const { password, ...userWithoutPassword } = req.currentUser;

//     res.send({id: req.currentUser._id,
//         first_name: req.currentUser.first_name,
//         last_name: req.currentUser.last_name,
//         username: req.currentUser.email,
//         role: req.currentUser.role,
//         age: req.currentUser.age,});
// };

function checkValidation(req){
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        //throw new HttpException(400, 'Validation faild', errors);
        throw new HttpException(400, errors.errors[0].msg, errors);
    }
}
async function hashPassword(req){
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
}

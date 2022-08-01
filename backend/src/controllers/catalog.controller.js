const db = require("../models");
const Catalog = db.catalog;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');
const cu = require("../utils/upload");
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')

const port = Number(process.env.PORT || 3332);
const host=`http://127.0.0.1:`+port;

exports.getAllItems = async (req, res) => {
    try{
      //const data = Role.find();
        const data = await Catalog.find();
        if (!data.length) {
            throw new HttpException(404, 'Users not found');
        }
        
        data.forEach((element, index) => {
            data[index].image = `${host}/images/${data[index].image}`;
        });
        console.log("[GET] get all prodects")
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  };
exports.getItemByid = async (req, res) => {
    try{
const path = require('path');
        //const data = await Catalog.findOne({_id:mongoose.Types.ObjectId(req.params.id)});
        const data = await Catalog.find().where('_id').in(req.params.id).exec();
        if (!data) {
            throw new HttpException(404, 'Item not found');
        }

        data.image = `${host}/${data.image}`;
        console.log("[GET] get prodect item")
        res.send(data[0]);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    };


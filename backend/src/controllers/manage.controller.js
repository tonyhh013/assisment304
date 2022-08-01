const db = require("../models");
const Cart = db.cart;
const Catalog = db.catalog;
const Order = db.order;
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');
const cu = require("../utils/upload");
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const rootpath =path.dirname(require.main.filename);

const port = Number(process.env.PORT || 3332);
const host=`http://127.0.0.1:`+port;



exports.getAllCatalog = async (req, res, next) => {
    let catalogList = await Catalog.find();
    console.log("[GET] get all catalog");
    if (!catalogList.length) {
        throw new HttpException(404, 'Items not found');
    }
    res.send(catalogList);
};
exports.getCatalogById = async (req, res) => {
    try{
        const data = await Catalog.findOne( {id: req.params.id});
        if (!data) {
            throw new HttpException(404, 'Item not found');
        }
        console.log("[GET] get catalog item detail by ID");
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.getAllOrder = async (req, res, next) => {
    
    let orderList = await Order.find();
    if (!orderList.length) {
        throw new HttpException(404, 'Items not found');
    }
    console.log("[GET] get all order");
    res.send(orderList);
};
exports.getOrderById = async (req, res) => {
    try{
        
        const data = await Order.findOne( {orderId: req.params.id});
        if (!data) {
            throw new HttpException(404, 'Item not found');
        }
        const items=data.items;
        for(let index = 0; index < items.length; index += 1) {
            items[index].detail.image = `${host}/images/${items[index].detail.image}`;
        }
        console.log("[GET] get order detail by ID");
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.updateCatalog = async (req, res, next) => {
    const file = req.file;
    const change = req.body.change;
    var filename=req.body.filename;
    console.log("[PUT] update catalog item");
    
    if (file) {
        filename=req.filename;
        var filePath = rootpath + '\\images\\' + req.body.orgfile;
        fs.unlinkSync(filePath);
    }
    if (change ==="Add"){
        try {
            const data= await Catalog.findOneAndUpdate(
                {
                    id:req.body.id
                },
                {
                    $inc: { stock: req.body.qty},
                    $set:{
                        name: req.body.name,
                        desc: req.body.desc,
                        price: req.body.price,
                        image: filename
                    }
                },
                {new:true}
            ) 
            res.send(data);
        } catch(error){
            res.status(500).json({message: error.message})
        }
    } else {
        try {
            const data= await Catalog.findOneAndUpdate(
                {
                    id:req.body.id
                },
                {
                    $set:{
                        name: req.body.name,
                        desc: req.body.desc,
                        price: req.body.price,
                        stock: 0,
                        image: filename
                    }
                },
                {new:true}
            ) 
            res.send(data);
        } catch(error){
            res.status(500).json({message: error.message})
        }
    }
    
};
exports.createCatalog = async (req, res, next) => {
    const file = req.file;
    console.log("[POST] create catalog item");
    var filename=req.body.filename;
    if (file) {
        filename=req.filename;
    }

    try {
        let findseq = await Catalog.aggregate([{$sort:{id:-1}}, {$limit:1}])
        var id = 1;

        if (findseq.length != 0){
            id = findseq[0].id+1;
        }
        const data= await new Catalog(
            {
                id:id,
                name: req.body.name,
                desc: req.body.desc,
                price: req.body.price,
                stock: req.body.qty,
                image: filename
            }
        ).save() 
        res.send(data);
    } catch(error){
        res.status(500).json({message: error.message})
    }
};
exports.deleteCatalog = async (req, res) => {
    try{
        //const data = Role.find();
        console.log("[DELETE] delete catalog item");
        const result = await Catalog.deleteMany({id: req.body.id});
        if (!result) {
            throw new HttpException(404, 'Item not found');
        }
        res.send('Item has been deleted');
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
exports.updateOrder = async (req, res, next) => {
    try {
        console.log("[PUT] update order status");
        var now = new Date();
        let time = new Date(now.getTime() + 8 * 60000 * 60);
        const data= await Order.findOneAndUpdate(
            {
                orderId:req.body.data.orderId
            },
            {
                $set:{
                    status: req.body.data.status,
                    modifyTime:time
                }
            },
            {new:true}
        ) 
        res.send(data);
    } catch(error){
        res.status(500).json({message: error.message})
    }
    
    
};
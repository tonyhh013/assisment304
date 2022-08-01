const db = require("../models");
const Cart = db.cart;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');
const cu = require("../utils/upload");
const multer = require('multer')
const path = require('path');
const fs = require('fs');


const port = Number(process.env.PORT || 3332);
const host=`http://127.0.0.1:`+port;

exports.getItem = async (req, res,next) => {
    try{
        var overstock = false;
        var overItems = [];
        var reducetotal=0;
        console.log("[GET] get user cart");
        //req.currentUser
        //const data = Role.find();

        const findOne = await (Cart.findOne( {name: req.currentUser.username}));
        if (!findOne) {
            throw new HttpException(404, 'Item not found');
        } else {
            const data = await Cart.aggregate([
                {$match:{name: req.currentUser.username}},
                { $unwind: '$items' },
                   {
                       $lookup: {
                           from: 'Catalog',
                           localField: 'items.id',
                           foreignField: '_id',
                           as: 'items.detail'
                       },
                   },
                   
                   { $unwind: {
                    path: "$items.detail",
                    preserveNullAndEmptyArrays: true
                  } },
                   {$addFields: {'items.subtotal': {
                     $multiply: [
                           "$items.detail.price",
                           "$items.qty"
                         ]
                        }
                       }
                   },
                   {$addFields: {'items.checkstock': {
                     $subtract: [
                           "$items.detail.stock",
                           "$items.qty"
                         ]
                        }
                       }
                   },
                   {
                       $group: {
                           _id: '$_id',
                           items: { $push: '$items' },
                           count : { $sum: "$items.qty" } ,
                           total: {
                       $sum: { 
                         $multiply: [
                           "$items.detail.price", 
                           "$items.qty" 
                         ]
                       } 
                     }
                   }
                   }
               ]);
            if (!data) {
                throw new HttpException(404, 'Item not found');
            }
 
            if (data[0] === undefined){
                throw new HttpException(404, 'Item not found');
            }
            
            const items=data[0].items;
            for(let index = 0; index < items.length; index += 1) {
                if(data[0].items[index].detail !== undefined) {
                    data[0].items[index].detail.image = `${host}/images/${items[index].detail.image}`;
                }
            }
            for(let index = 0; index < items.length; index += 1) {
                if(data[0].items[index].detail !== undefined){
                    if (items[index].checkstock<0){
                        reducetotal=reducetotal+(items[index].checkstock*items[index].detail.price)
                        overstock=true; 
                        var newqty = items[index].qty + items[index].checkstock
                        if (newqty>0){
                            await Cart.updateOne(
                                {
                                        name:req.currentUser.username,
                                        'items.id':items[index].id
                                },
                                {
                                    $set:{'items.$.qty':newqty}
                                }
                            )
                            const exists = overItems.some(key => key.id === items[index].id);
                            if(!exists) {
                                overItems.push(data[0].items[index])
                            }
                            data[0].items[index].qty=newqty;
                        } else {
                            await Cart.findOneAndUpdate({
                                name: req.currentUser.username,
                            }, 
                            {
                            $pull: {
                                items: { id:items[index].id}
                            }
                            }, { new: true });
                            const exists = overItems.some(key => key.id === items[index].id);
                            if(!exists) {
                                overItems.push(data[0].items[index])
                            }
                            data[0].items.splice(index, 1);
                        }
                        
                       
                    }
                } else {
                    overstock=true; 
                    await Cart.findOneAndUpdate({
                            name: req.currentUser.username,
                        }, 
                        {
                        $pull: {
                            items: { id:items[index].id}
                        }
                        }, { new: true });
                    const exists = overItems.some(key => key.id === items[index].id);
                    if(!exists) {
                        overItems.push(data[0].items[index])
                    }
                    data[0].items.splice(index, 1);
                }
                
            }
            data[0].overstock=overstock;
            data[0].overitems=overItems;
            data[0].total=data[0].total+reducetotal;
            res.send(data);
        }
        
    }
    catch(error){

        res.status(500).json({message: error.message})
    }
};
    
exports.AddArrayCart = async (req, res) => {
    try{
        //const data = Role.find();
        const data = await Cart.findOneAndUpdate({
            name: req.currentUser.username,
        }, 
        {
          $push: {
            items: { id:3,name:"lname",desc:"surname" }
          }
        }, { new: true });
        if (!data) {
            throw new HttpException(404, 'item not found');
        }
        console.log("[PUT] add a new item in the cart")
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
exports.RemoveArrayCart = async (req, res) => {
    try{
        //const data = Role.find();

        
        const data = await Cart.findOneAndUpdate({
            name: req.currentUser.username,
        }, 
        {
          $pull: {
            items: { id:req.body.item.id}
          }
        }, { new: true });
        if (!data) {
            throw new HttpException(404, 'item not found');
        }
        console.log("[PUT] remove cart item");
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

exports.createCart = async (req, res, next) => {
    const finduser = await Cart.findOne( {name: req.currentUser.username});
        console.log("[POST] create a user cart")
        if (!finduser) {
            const data=await new Cart({
                name:req.currentUser.username,
                items: [ { id:req.body.item._id,name:req.body.item.name,qty:1 }]
              }).save();
        
            if (!data) {
                throw new HttpException(500, 'Something went wrong');
            }
        
            res.send(data);
        } else {
            try{
                //const data = Role.find();
                const data = await Cart.findOneAndUpdate({
                    name: req.currentUser.username,
                }, 
                {
                  $push: {
                    items: { id:req.body.item._id,name:req.body.item.name,qty:1 }
                  }
                }, { new: true });
                if (!data) {
                    throw new HttpException(404, 'item not found');
                }
                res.send(data);
            }
            catch(error){
                res.status(500).json({message: error.message})
            }
        }
};
exports.updateCartQTY = async (req, res, next) => {
    try {
        const data= await Cart.updateMany(
            {
                    name:req.currentUser.username,
                    'items.id':req.body.item._id
            },
            {
                $set:{'items.$.qty':req.body.qty}
            }
        ) 
        console.log("[PUT] update the quantity of the item in the cart.")
        res.send(data);
    } catch(error){
        res.status(500).json({message: error.message})
    }
    
};
exports.deleteCart = async (req, res) => {
    try{
        //const data = Role.find();
        const result = await Cart.deleteMany({name: req.currentUser.username});
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        console.log("[DELETE] delete user cart")
        res.send('User has been deleted');
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

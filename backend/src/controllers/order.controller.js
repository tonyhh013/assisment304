const db = require("../models");
const Order = db.order;
const Cart = db.cart;
const Catalog = db.catalog;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');
const HttpException = require('../utils/HttpException.utils');
const cu = require("../utils/upload");
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
const tz = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(tz)
dayjs.tz.setDefault("Asia/Taipei")


const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const port = Number(process.env.PORT || 3332);
const host=`http://127.0.0.1:`+port;

// exports.getAllItems = async (req, res) => {
//     try{
//       //const data = Role.find();
//         const data = await Order.find();
//         if (!data.length) {
//             throw new HttpException(404, 'Items not found');
//         }
        
//         // const items=data.items.forEach((element, index) => {
//         //     data[index].image = `${host}/${data[index].image}`;
//         // });
        
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// };
exports.getOrder = async (req, res) => {
    try{
        const data = await Order.find( {name: req.currentUser.username}).sort({ createTime: -1 });
        if (!data) {
            throw new HttpException(404, 'Item not found');
        }
        console.log("[GET] get user order list")
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
exports.getOrderId = async (req, res) => {
    try{
        //const data = Role.find();
        (req.params.id);
        const data = await Order.findOne( {name: req.currentUser.username,orderId: req.params.id});
        if (!data) {
            throw new HttpException(404, 'Item not found');
        }
        const items=data.items;
        for(let index = 0; index < items.length; index += 1) {
            items[index].detail.image = `${host}/images/${items[index].detail.image}`;
        }
        console.log("[GET] get user order detail")
        res.send(data);
    }
    catch(error){

        res.status(500).json({message: error.message})
    }
};
exports.getUserByName = async (req, res) => {
    try{
        //const data = Role.find();
        const data = await Order.findOne( {username: req.params.name});
        if (!data) {
            throw new HttpException(404, 'User not found');
        }
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
exports.createOrder = async (req, res,next) => {
    try{
        //req.currentUser
        //const data = Role.find();
        const findOne = await (Cart.findOne( {name: req.currentUser.username}));
        if (!findOne) {
            throw new HttpException(404, 'Item not found1');
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
                   
                   { $unwind: '$items.detail' },
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
            // const items=data[0].items;
            // items.forEach((element, index) => {
            //     items[index].detail.image = `${host}/${items[index].image}`;
            // });
            const items=data[0].items;
            for(let index = 0; index < items.length; index += 1) {
                var newqty = items[index].qty + items[index].checkstock
                await Catalog.updateOne(
                    {
                            _id:items[index].id,
                    },
                    {
                        $set:{stock:items[index].checkstock}
                    }
                )  
            }
            
            var now = new Date();
            let time = new Date(now.getTime() + 8 * 60000 * 60);

            
            let date = dayjs().tz("Asia/Taipei").local().format("YYYYMMDD");
            let findseq = await Order.aggregate([ {$match:{date: date}},{$sort:{seq:-1}}, {$limit:1}])
            var seq = 1;
            if (findseq.length != 0){
                seq = findseq[0].seq+1;
            }
            var orderId = date + seq.toString().padStart(6,'0');
            const savedata=await new Order({
                name:req.currentUser.username,
                orderId: orderId,
                seq: seq,
                date: date,
                createTime: time,
                modifyTime: time,
                total: data[0].total,
                address: '',
                status: 'Pending Payment',
                paymentId: '',
                items: data[0].items
              }).save();
            const deleteCart = await Cart.deleteMany({name: req.currentUser.username});
            if (!deleteCart) {
                throw new HttpException(404, 'item not found');
            }
            console.log("[POST] create order")
            res.send(savedata);
        }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
exports.payment = async (req, res) => {
    let { amount, id,address } = req.body.payload
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "HKD",
			description: "Shop",
			payment_method: id,
			confirm: true
		})

        const data = await Order.findOneAndUpdate({
            orderId: req.body.payload.orderId,
        }, 
        {
            $set:{paymentId:id,address:address,status:'Processing'}
        }, { new: true });
        if (!data) {
            throw new HttpException(404, 'item not found');
        }
        console.log("[PUT] order payment status update.")

		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		res.json({
			message: "Payment failed",
			success: false
		})
	}
};
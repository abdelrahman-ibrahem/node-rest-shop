const Order = require('../models/orderModel');
const mongoose = require('mongoose');


exports.get_all_orders =  (req , res)=>{
    Order.find().populate('productId' , 'name').then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json({
            message: err,
        });
    });
};


exports.create_new_order = (req , res)=>{
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order.save().then(result=>{
        res.status(200).json({
            message: "the new order is created",
            order: result
        });
    }).catch(err=>{
        res.status(404).json({
            message: err
        })
    })
};


exports.get_singel_order = (req , res)=>{
    Order.findById(req.params.id).select('productId quantity').populate('productId').then(result=>{
        if(!result) return res.status(200).json({ message: "the order with the given id is not found" });
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json({
            message: err
        })
    })
};

exports.delete_order = (req , res)=>{
    const order = Order.findById(req.params.id);
    if(!order) return res.status(200).json({ message: "the order is Not found" });

    Order.remove({ _id: req.params.id }).then(result=>{
        res.status(200).json({
            message: "the order with the given id is deleted"
        })
    }).catch(err=>{
        res.status(404).json({
            message: err
        })
    });
};
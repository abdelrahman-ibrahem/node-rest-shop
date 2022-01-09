const mongoose = require('mongoose');
const Product = require('../models/product');




exports.getAllProducts = (req , res)=>{
    Product.find().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json({
            message: err,
        });
    })
};
exports.create_new_product = (req , res)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name , 
        price: req.body.price,
        productImage: req.file.path ,
    });
    product.save().then(result=>{
        res.status(200).json({
            message:"the new product is created",
            product: result,
        });
    }).catch(err=>{
        res.status(404).json({
            message: err,
        });
    })
};

exports.get_single_product = (req , res)=>{
    Product.findById(req.params.id).then(result=>{
        if(!result) return res.status(200).json({ message: "the product with the given id is not found " });
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json({
            message: "the product with the given id is not found ",
        });
    })
};


exports.delete_product =  (req , res)=>{
    const id = req.params.id;
    const product = Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "the product with this id is not found" });
    Product.remove({ _id: id }).then(()=>{
        res.status(200).json({
            message:"the product is deleted",
        });
    }).catch(err=>{
        res.status(404).json({
            message:err,
        });
    })
};


exports.update_product = async(req , res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "the product with the given id is not found" });

    product.set(req.body);
    await product.save().then(result=>{
        res.status(200).json({
            message: "the product updated",
            product : result
        });
    }).catch(err=>{
        res.status(404).json({
            message:err,
        });
    })

};
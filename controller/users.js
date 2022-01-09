const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




exports.create_new_user =  (req , res)=>{
    bcrypt.hash(req.body.password , 10  , (err , hash)=>{
        if (err){
            return res.status(404).json({
                message: err,
            });
        }else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
            });
            user.save().then(result=>{
                res.status(200).json({
                    message: "new user is created",
                    email: result.email,
                });
            }).catch(err=>{
                console.log(err);
                return res.status(404).json({
                    message: err,
                });
            })
        }
    });
};



exports.login = (req , res)=>{
    User.findOne({ email: req.body.email }).then(user=>{
        if (!user) {
            return res.status(200).json({
                message: "the user is Not found"
            });
        }else{
            bcrypt.compare(req.body.password ,user.password  , (err , result)=>{
                if(err){
                    return res.status(404).json({
                        message: err.message
                    });
                }
                if(result){
                    const token = jwt.sign({ email: user.email , userId: user._id },
                        'jwtPrivateKey',{
                            expiresIn: '1h'
                        }    
                    );
                    return res.status(200).json({
                        message: "success",
                        token: token
                    });
                }
                return res.status(404).json({
                    message: "Auth faild",
                });
            })
        }
    }).catch(err=>{
        res.status(404).json({
            message: err.message
        });
    });
};



exports.delete_user = (req , res)=>{
    User.findById(req.params.id).then(result=>{
        if(!result){
            res.status(200).json({
                message: "User is not found"
            });
        }else{
            User.remove({ _id: req.params.id }).then(result=>{
                res.status(200).json({
                    message: "user is deleted"
                });
            }).catch(err=>{
                res.status(404).json({
                    message: err.message
                });
            })
        }
    }).catch(err=>{
        res.status(404).json({
            message: err.message
        });
    });
};
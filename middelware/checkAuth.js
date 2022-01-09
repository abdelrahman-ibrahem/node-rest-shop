const jwt = require('jsonwebtoken');

module.exports = (req , res , next)=>{
    try{
        const token = req.headers.authentication;
        const decoded = jwt.verify(token , 'jwtPrivateKey');
        req.userData = decoded;
        next();
    }catch(err){
        return res.status(404).json({
            message: "Auth Faild"
        });
    }
};
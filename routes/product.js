const express = require('express');
const multer = require('multer');
const router = express.Router();
const checkAuth = require('../middelware/checkAuth');
const productsController = require('../controller/product');

// Handel multer function 
const storage = multer.diskStorage({
    destination: function (req , file , cb){
        cb(null ,  "uploads/");
    },
    filename: function (req , file , cb){
        cb(null , Date.now().toString() + file.originalname );
    }
});

const upload = multer({ storage: storage });

router.get("/" , productsController.getAllProducts);
router.post("/" , upload.single('productImage') , checkAuth , productsController.create_new_product);
router.get("/:id" , productsController.get_single_product);
router.delete("/:id" , checkAuth  ,productsController.delete_product);
router.patch("/:id" , productsController.update_product);

module.exports = router;
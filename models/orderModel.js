const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product' ,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
        required: true,
    }
});


const Order = mongoose.model('Order' , orderSchema);

module.exports = Order;
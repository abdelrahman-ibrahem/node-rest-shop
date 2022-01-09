const express = require('express');
const app = express();
const mongoose = require('mongoose');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/orders');
const userRoute = require('./routes/user');
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('uploads'));
app.use(morgan('dev'));
mongoose.connect('mongodb://localhost/node-rest').then(()=>{
    console.log('App is connected with db');
}).catch(err=>{
    console.log(err);
});

app.use('/products' , productRoute);
app.use('/orders' , orderRoute);
app.use('/users' , userRoute);
const port = 3000;
app.listen(port, ()=>console.log('App is Running'));
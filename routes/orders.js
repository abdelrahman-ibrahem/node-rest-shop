const express = require('express');
const router = express.Router();
const ordersController = require('../controller/order');
const checkAuth = require('../middelware/checkAuth');

router.get("/" ,ordersController.get_all_orders);

router.post("/" , ordersController.create_new_order);

router.get("/:id" , ordersController.get_singel_order);


router.delete("/:id" , ordersController.delete_order);

module.exports = router;
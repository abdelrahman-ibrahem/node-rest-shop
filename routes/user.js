const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');
const checkAuth = require('../middelware/checkAuth');

router.post('/register', usersController.create_new_user);
router.post('/login' , usersController.login);
router.delete('/:id' , checkAuth , usersController.delete_user);

module.exports = router;
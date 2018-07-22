var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.js')

/* GET home page. */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/isLogin', userController.isLogin);
router.get('/logout', userController.logout);

module.exports = router;

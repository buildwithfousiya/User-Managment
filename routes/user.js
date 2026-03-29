const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');

router.get('/login', auth.isLogin, userController.loadLogin);
router.post('/login', auth.validateLogin, userController.login);

router.get('/register', auth.isLogin, userController.loadRegister);
router.post('/register', auth.validateRegister, userController.registerUser);

router.get('/home', auth.checkSession, userController.loadHome);
router.get('/logout', auth.checkSession, userController.logout);

router.post('/showMail',auth.checkSession,userController.loadMail);

module.exports = router;
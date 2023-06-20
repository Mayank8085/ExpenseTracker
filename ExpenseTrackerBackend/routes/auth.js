//login or signup through google token
const express = require('express');
const router = express.Router();
const { LoginOrSignup } = require('../controllers/auth');

//user data will be sent from client side
router.post('/loginOrSignup',LoginOrSignup);


module.exports = router;
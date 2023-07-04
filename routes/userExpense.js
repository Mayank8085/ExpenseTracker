const express = require('express');
const router = express.Router();

const { requireLogin } = require('../middleware/auth');
const { addOrUpdateUserMonthByEarning , sumOfAllMonthEarning, getCurrentMonthEarning} = require('../controllers/userExpense');

//add or update user month by earing data
router.post('/addorUpdateUserMonthbyEarning', requireLogin, addOrUpdateUserMonthByEarning);

//sum of all month earning
router.get('/sumOfAllMonthEarning', requireLogin, sumOfAllMonthEarning);

//get current month earning
router.post('/getCurrentMonthEarning', requireLogin, getCurrentMonthEarning);

module.exports = router;


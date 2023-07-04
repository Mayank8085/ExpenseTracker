const express = require("express");
const {
  addOrUpdateExpense,
  getAllExpensesOfCurrentMonth,
  getExpense,
  sumOfAllExpensesOfCurrentMonth,
sumOfAllExpenses,
} = require("../controllers/expense");
const router = express.Router();
const { requireLogin } = require("../middleware/auth");

//add or update expense
router.post("/addorUpdateExpense", requireLogin, addOrUpdateExpense);

//get all expenses of current month
router.post(
  "/getAllExpensesOfCurrentMonth",
  requireLogin,
  getAllExpensesOfCurrentMonth
);

//get a single expense
router.get("/getExpense", requireLogin, getExpense);

//get sum of all expenses of current month
router.post(
  "/getSumOfAllExpensesOfCurrentMonth",
  requireLogin,
  sumOfAllExpensesOfCurrentMonth
);

//get sum of all expenses of current USER
router.get("/getSumOfAllExpenses", requireLogin, sumOfAllExpenses);

module.exports = router;

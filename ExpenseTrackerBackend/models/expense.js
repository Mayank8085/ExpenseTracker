const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Food", "Travel", "Shopping", "Others"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  month: {
    type: String,
  },
  year: {
    type: String,
  },

  paymentType: {
    type: String,
    required: [true, "Payment Type is required"],
    enum: ["Cash"],
  },
  TotalEarning: {
    type: Number,
    required: [true, "Total Money is required"],
    default: 0,
  },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Expense", expenseSchema);

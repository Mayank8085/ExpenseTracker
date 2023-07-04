const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Date is required"],
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
    type: Number,
  },
  year: {
    type: Number,
  },

  paymentType: {
    type: String,
    required: [true, "Payment Type is required"],
    enum: ["Cash", "Card", "UPI", "Others"],
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Expense", expenseSchema);

const Expense = require("../models/expense");

//add or update expense
exports.addOrUpdateExpense = async (req, res) => {
    try{
        const { date, amount, category, description, paymentType } = req.body;
        const userId =req.id;
        month = new Date(date).getMonth() + 1;
        year = new Date(date).getFullYear();
        //check if expense exists
        const expenses = await Expense.findOne({ date, category,  description, paymentType, month, year, user: userId });
        if(expenses){
            //update expense
            const expense= await Expense.findByIdAndUpdate(expenses._id, { $set: { amount: amount } });
            res.status(200).json({message: "Expense updated successfully",
            expense
        
        });
        }else{
            //add expense
            const newExpense = new Expense({ date, amount, category,  description, paymentType, month, year, user: userId });
            const expense = await newExpense.save();
            res.status(200).json({message: "Expense added successfully",
             expense
        });
        }

    }catch(err){
        res.status(500).json({message: err.message});
    }
} 

//get all expenses of current month
exports.getAllExpensesOfCurrentMonth = async (req, res) => {
    try{
        const userId =req.id;
        const month =req.body.month;
        const year =req.body.year;
        const expenses = await Expense.find({ month, year, user: userId });
        res.status(200).json({expenses, message: "Expense fetched successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//get a single expense
exports.getExpense = async (req, res) => {
    try{
        const userId =req.id;
        const expenseId = req.body.id;
        const expense = await Expense.findOne({ _id: expenseId, user: userId });
        res.status(200).json({expense, message: "Expense fetched successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//get sum of all expenses of current month
exports.sumOfAllExpensesOfCurrentMonth = async (req, res) => {
    try{
        const userId =req.id;
      const { month, year } = req.body;
        const expenses = await Expense.find({ month, year, user: userId });
        if(expenses.length === 0){
            return res.status(200).json({message: "Expense fetched successfully", sum: 0});
        }
        const sum = expenses.reduce((prev, curr) => {
            return prev + curr.amount;
        }, 0);
        res.status(200).json(
            {message: "Expense fetched successfully",sum});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//sum of expense of current user 
exports.sumOfAllExpenses = async (req, res) => {
    try{
        const userId =req.id;
        const expenses = await Expense.find({ user: userId });
        if(expenses.length === 0){
            return res.status(200).json({message: "Expense fetched successfully", sum: 0});
        }
        const sum = expenses.reduce((prev, curr) => {
            return prev + curr.amount;
        }, 0);
        res.status(200).json(
            {message: "Expense fetched successfully", sum});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}




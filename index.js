require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userExpense');
const expenseRoutes = require('./routes/expense');
//middlewares
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


//database connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//routes
app.use('/auth', authRoutes )
app.use('/user', userRoutes)
app.use('/expense', expenseRoutes)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}
);

    
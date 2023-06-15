const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [20, 'Name cannot be more than 20 characters'],
        minlength: [3, 'Name must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    googleId: {
        type: String,
        required: [true, 'Google Id is required'],
        unique: true
    },
    photo: {
        type: String,
        required: [true, 'Photo is required']
    },
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense'
        }
    ], 
    totalSaving: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
    
});

module.exports = mongoose.model('User', userSchema);



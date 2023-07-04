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
    //array of objects
    monthByEarning: [{
        year: {
            type: Number,
            //required: [true, 'Year is required']
        },
        month: {
            type: Number,
           // required: [true, 'Month is required']
        },
        earning: {
            type: Number,
            //required: [true, 'Earning is required']
        },
    }],

}, {
    timestamps: true
    
});

module.exports = mongoose.model('User', userSchema);



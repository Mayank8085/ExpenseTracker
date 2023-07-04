const User = require("../models/user");
const jwt = require('jsonwebtoken');


//login or signup through google 
exports.LoginOrSignup = async (req, res) => {
    //USE TRY CATCH BLOCK
    const { name, email, googleId, photo } = req.body;
    try{
        //check if user exists
        const user = await User.findOne({ email: email }).exec();
        if(user){
            //generate token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            //send response to client
            res.json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    photo: user.photo,
                    googleId: user.googleId,
                    
                }
            });

        }else{
            //create new user
            let newUser = new User({
                name: name,
                email: email,
                googleId: googleId,
                photo: photo,
            });
            const user = await newUser.save();
            if(user){
                //generate token
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                //send response to client
                res.json({
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        photo: user.photo,
                        googleId: user.googleId,
                        
                    }
                });
            }else{
                res.status(400).json({
                    error: 'Something went wrong'
                })
            }
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            error: 'Something went wrong'
        })
    }
};


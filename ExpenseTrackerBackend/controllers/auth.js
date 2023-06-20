const User = require("../models/user");
const jwt = require('jsonwebtoken');


//login or signup through google 
exports.LoginOrSignup = (req, res) => {
    // console.log(req.body);
    const { name, email, photo, googleId } = req.body;

    //check if user already exists
    User.findOne({ email: email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                //if user already exists
                //generate token
                const token = jwt.sign({ user : user }, process.env.JWT_SECRET);
                const { _id, name, email, photo, totalEarning } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id, name, email, photo, totalEarning
                    }
                });
            }
            else {
                //if user does not exist
                //create new user
                const newUser = new User({ name, email, photo, googleId });
                newUser.save((error, data) => {
                    if (error) return res.status(400).json({ error });
                    if (data) {
                        //generate token
                        const token = jwt.sign({ user : data }, process.env.JWT_SECRET);
                        const { _id, name, email, photo, totalEarning } = data;
                        res.status(200).json({
                            token,
                            user: {
                                _id, name, email, photo, totalEarning
                            }
                        });
                    }
                });
            }
        });
}

//login or signup through google token
import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
const router = express.Router();

//user data will be sent from client side
router.post('/google', async (req, res) => {
const  user = req.body;
// console.log(user);
if (!user) {
    return res.status(400).json({message: 'User not found'});
}
// console.log(user);
const {email, name, googleId, photo} = user;
// console.log(email, name, googleId, photo);
User.findOne({googleId}).exec((err, user) => {
    // console.log(user);
    if (err) {
        status(400).json({message: 'Something went wrong'});
    } else {
        // console.log(user);
        if (user) {
            // console.log(user);
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
            const {_id, email, name, photo, role} = user;
            res.json({
                token,
                user: {_id, email, name, photo, role}
            });
        } else {
            let newUser = new User({email, name, googleId, photo});
            newUser.save((err, data) => {
                if (err) {
                    return res.status(400).json({message: 'Something went wrong'});
                }
                const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
                const {_id, email, name, photo, role} = data;
                res.json({
                    token,
                    user: {_id, email, name, photo, role}
                });
            });
        }
    }
});

}
);

export default router;
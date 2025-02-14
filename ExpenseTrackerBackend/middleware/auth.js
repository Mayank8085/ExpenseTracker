const jwt = require('jsonwebtoken');

//middleware to check if user is logged in
exports.requireLogin = async (req, res, next) => {
    if(!req.header("Authorization")){
        return res.status(400).json({ error: 'Authorization required' });
    }
    
    const token = req.header("Authorization").replace("Bearer ", "" );

    if(token){
        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        //attach _id to request
        req.id = decode._id;
        
        next();
    }else{
        return res.status(400).json({ error: 'Authorization required' });
    }
}
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../env');

const userMiddleware = (req,res,next)=>{

    const token = req.headers.authorization.split(' ')[1];
     console.log(token)
    const verify = jwt.verify(token , JWT_SECRET);
     console.log(verify);
     if(!verify.username){
        return res.status(403).json({message: "Invalid token"});
     }
     
     next();
}

module.exports = userMiddleware;
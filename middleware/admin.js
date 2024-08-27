const {Admin} = require('../db');
const bcrypt = require('bcryptjs');
const adminMiddleware = async(req,res,next)=>{
    const {username , email ,password} = req.body;

    const isAdmin = await Admin.findOne({username: username, email: email});

    if(!isAdmin){
        return res.status(401).json({error: "Invalid credentials"});
    }

    const Password = await bcrypt.compare(password,isAdmin.password);
    console.log("pass",Password);
    if(!Password){
        return res.status(401).json({error: "Invalid Password"});
    }
    next();
}

module.exports = adminMiddleware;
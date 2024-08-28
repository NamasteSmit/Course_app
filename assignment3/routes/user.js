const express = require('express');
const router = express.Router();
const {User} = require('../db/index');
const userMiddleware = require('../middleware/user');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../env');
router.post('/signup',async(req,res)=>{
    const {username , email , password} = req.body;
      
     const user = await User.create({
        username : username,
        email : email,
        password : password
     })

     return res.status(200).json({
        message : "User created successfully",
        user : user
     })
 
})


router.post('/signin',async(req,res)=>{
  
       const {username , email , password} = req.body;

       const user = await User.findOne({email : email});
     
       if(!user){
        return res.status(400).json({
            message : 'User not found'
        })
       }

       const token = jwt.sign({username : user.username, email : user.email} , JWT_SECRET);
 

       return res.status(200).json({
        message : 'User logged in successfully',
        token : token
       })
       
 })

 router.get('/course' , userMiddleware ,(req,res)=>{
    return res.status(200).json({
        message : 'User purchased a course',
     })
    }
 )

 module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {Admin , Course} = require('../db/index');
const adminMiddleware = require('../middleware/admin');

//add a new admin
router.post('/signup',async(req,res)=>{
     const {username , email , password} = req.body;
     
      const admin = await Admin.findOne({email : email});

      if(admin){
        return res.status(400).json(
            {msg : 'Admin already exists'}
        );
      }

      const hashPassword = await bcrypt.hash(password,10);
      

      const newAdmin = await Admin.create({
        username : username,
        email : email,
        password :  hashPassword
      })

      return res.status(200).json({
        message : "Admin created successfully",
        admin : newAdmin
          })
})

//admin can create a new course
router.post('/courses',adminMiddleware, async(req,res)=>{
        const {title , Description , price} = req.body;

        const newCourse = await Course.create({
            title : title,
            Description : Description,
            Price : price
        })

        return res.status(200).json({
            message : "Course created successfully",
            course : newCourse
        })
})

//return all the courses 

router.get('/get-course-list',adminMiddleware,async(req,res)=>{
      const all_Courses = await Course.find({});

      return res.status(200).json({
        courses : all_Courses
      })
})





module.exports = router;
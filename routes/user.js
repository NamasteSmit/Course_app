const express =  require('express');
const router = express.Router();
const {User,Course} = require('../db/index');


//to create a new user
router.post('/signup',async(req,res)=>{

    const {username, email, password} = req.body;


     const user = await User.create({
        username: username,
        email: email,
        password: password
     })

     return res.status(200).json({
        message: "User created successfully",
        user: user
     })
 })

//to get list of all courses 

router.get('/courses',async(req,res)=>{
    
       const courses = await Course.find({});

       return res.status(200).json({
        courses: courses
     })
})

// to purchase a new course

router.post('/purchase-course/:courseId',async(req,res)=>{
     const id = req.params.courseId;
     const {username , email , password} = req.body;

     const course = await Course.findOne({_id : id});

     const user = await User.updateOne({email : email} , {$push : { purchasedCourse : course}});

     return res.status(200).json({
        message: "Course purchased successfully",
        course: course,
        user : user
     })
})

router.get('/my-courses',async(req,res)=>{
    const {username, email, password} = req.body;

    const user = await User.findOne({email : email});
    console.log(user.purchasedCourse);

//     const purchasedCourses = await Promise.all(
//      user.purchasedCourse.map(async(ele)=>{
//         return await Course.findOne({_id : ele});
//     })
// );
  
    const purchasedCourses = await Course.find({
         _id : {
            $in : user.purchasedCourse
         }
    })

    return res.status(200).json({
        message: "My purchased courses",
        courses: purchasedCourses
    })
})

module.exports = router;
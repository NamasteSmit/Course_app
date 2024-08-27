const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://smitpatel1305:Smit2004@cluster0.udla4ro.mongodb.net/course2_app").then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>console.log(err));

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    purchasedCourse : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Course'
        }
    ]
})

const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,

    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    },
})

const courseSchema = new mongoose.Schema({
     title : String,
     Description : String,
     Price : String,
})

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin',adminSchema);
const Course = mongoose.model('Course',courseSchema);

module.exports = {
    User,
    Admin,
    Course,
}
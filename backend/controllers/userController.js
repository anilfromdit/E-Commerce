const User = require("../models/usersModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError");
const { json } = require("body-parser");


// Creating a user account
exports.registerUser = handleAsync(async(req,res,next)=>{

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id : "this is sample public id",
            url : "profile pic url"
        }
    })

    res.status(201).json({
        success:true,
        user
    })

})
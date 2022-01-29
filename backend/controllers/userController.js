const User = require("../models/usersModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError");
const { json } = require("body-parser");
const sendToken = require("../utils/jwtToken");


// Creating a user account
exports.registerUser = handleAsync(async(req,res,next)=>{

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id : "this is sample public id",
            url : "profile pic url"
        }
    });

    sendToken(user,201,res);

})

exports.loginUser = handleAsync(async(req,res,next)=>{
    const{email,password} = req.body;
    if(!email || !password){ return next(new ErrorHandler("Email and Password Required"))}
    const user = await User.findOne({email}).select("+password");
    
    if(!user){return next(new ErrorHandler("Invalid Email or Password",401))}

    
  const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password h", 401));
      
    }

    sendToken(user,200,res);

})


// exports.loginUser = handleAsync(async (req, res, next) => {
//     const { email, password } = req.body;
  
//     // checking if user has given password and email both
  
//     if (!email || !password) {
//       return next(new ErrorHandler("Please Enter Email & Password", 400));
//     }
  
//     const user = await User.findOne({ email }).select("+password");
  
//     if (!user) {
//       return next(new ErrorHandler("Invalid email or password", 401));
//     }
  
//     const isPasswordMatched = await user.comparePassword(password);
  
//     if (!isPasswordMatched) {
//       return next(new ErrorHandler("Invalid email or password h", 401));
//     }
  
//     sendToken(user, 200, res);
//   });
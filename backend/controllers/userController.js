const User = require("../models/usersModel");
const ErrorHandler = require("../utils/errorHandler");
const handleAsync = require("../middleware/catchAsyncError");
const { json } = require("body-parser");
const sendToken = require("../utils/jwtToken");
const sendEmail= require("../utils/sendEmail");


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
      return next(new ErrorHandler("Invalid email or password", 401));
      
    }

    sendToken(user,200,res);

})

exports.logout = handleAsync(async(req,res,next)=>{

  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true,
  });
  res.status(200).json({
    success:true,message:"Logged out"
  })

});

// forgot password
exports.forgotPassword = handleAsync(async(req,res,next)=>{

  const user = await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHandler("User not found",404));
  }

  //get reset password token

 const resetToken =  user.getResetPasswordToken();

 await user.save({ validateBeforeSave:false });

 const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

 const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\nIf you have not requested this then please ignore`;

 try{
  await sendEmail({
    email:user.email,
    subject: `E-Com with Anil Password Recovery`,
    message,
  })
  res.status(200).json({
    success:true,
    message:`Email sent to ${user.email} successfully`,
  })


 }catch(error){
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;
await user.save({ validateBeforeSave:false });
return next(new ErrorHandler(error.message,500));
 }


})
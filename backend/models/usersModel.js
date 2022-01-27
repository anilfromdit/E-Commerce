const mongoose= require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[32,"Name Can't Exceed 32 Characters"],
        minLength:[4,"Name should have at least 4 Characters"],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"password should have at least 8 Characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken : String,
    resetPasswordExpiry: Date,
});

module.exports = mongoose.model("user",userSchema);
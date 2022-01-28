const bcrypt = require("bcryptjs/dist/bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose= require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

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

userSchema.pre("save",async function(next){

    if(!this.isModified("Password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

//JWT Token
userSchema.method.getJWTToken = function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

module.exports = mongoose.model("user",userSchema);
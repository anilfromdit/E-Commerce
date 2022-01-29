const bcrypt = require("bcryptjs");
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
        maxLength:[128,"password cannot exceed 128 characters"],
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

// userSchema.pre("save",async function(next){

//     if(!this.isModified("Password")){
//         next();
//     }
//     this.password = await bcrypt.hash(this.password,10);
// })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });


//JWT Token
userSchema.methods.getJWTToken = function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
module.exports = mongoose.model("User",userSchema);
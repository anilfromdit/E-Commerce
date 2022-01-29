const handleAsync = require("../middleware/catchAsyncError");

exports.isAuthenticatedUser = handleAsync(async(req,res,next)=>{

    const token = req.cookies;

    console.log(token);
});
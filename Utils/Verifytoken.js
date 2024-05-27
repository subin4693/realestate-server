const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("./AsyncErrorHandler");
const CustomError = require("./CustomError");

exports.verifyToken = asyncErrorHandler(async(req,res,next)=>{
    
    const testToken = req.cookies.token
  
    let token;
    if(testToken && testToken.startsWith("bearer")){
         
        token = testToken.split(" ")[1]
    }
  
    if(!token){
        
        return res.status(200).json({
            status:"success",
            message:"You are not loggedin"
        })
    }
     
    const decoded =  jwt.verify(token,process.env.JWT_SECRECT)
console.log("verify token decoded .................")
    req.body.user = {
        id:decoded.id,
        
    }
    
    next();
})
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();
const User = require("../Models/UserModel")
 
const asyncErrorHandler = require("../Utils/AsyncErrorHandler");
const CustomError = require("../Utils/CustomError");

exports.signup = asyncErrorHandler(async (req, res, next) => {
 
    const {firstname,lastname,email,phonenumber ,role  } = req.body;
 
    const newUser = await User.create({firstname,lastname,email,phonenumber ,role  });
    const token = jwt.sign(
        { id: newUser._id, },
        process.env.JWT_SECRECT,
        {
            expiresIn: process.env.LOGIN_EXPIRES,
        },
    );

    
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

   await res.cookie("token", "bearer " + token, {
        expires: expirationDate,
    });

    res.status(201).json({
        status: "success",

        data: {
            user: newUser,
        },
    });
});

exports.signin = asyncErrorHandler(async (req, res, next) => {
 
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
 
    if (!email || !phonenumber ) {
        const error = new CustomError(
            "Please enter mail id and phonenumber for login",
            400,
        );
        return next(error);
    }
 
    const user = await User.findOne({ email });
 
    if(!user){
        const error = new CustomError(
            "User not found",
            400,
        );
        return next(error);
    }
 
   
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRECT,
        {
            expiresIn: process.env.LOGIN_EXPIRES,
        },
    );

    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

   await res.cookie("token", "bearer " + token, {
        expires: expirationDate,
    });

    res.status(201).json({
        status: "success",

        data: {
            user,
        },
    });
});


exports.signout = asyncErrorHandler(async(req,res,next)=>{
    res.clearCookie("token");

    res.status(200).json({
        status: "success",
        message: "User successfully signed out."
    });
         
})

exports.verify = asyncErrorHandler(async (req, res, next) => {
    const userId = req.body.user.id;

  
    const user = await User.findById(userId)
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.sellerDetails = asyncErrorHandler(async(req,res,next)=>{

 
    const seller = await User.findById(req.params.id);
console.log(seller);
console.log(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            seller
        },
    
    });
         
})

 

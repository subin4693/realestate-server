const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "Please enter your name."],
        },
        lastname: {
            type: String,
            required: [true, "Please enter your name."],
        },
        email: {
            type: String,
            required: [true, "Please enter an email."],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please enter a valid email."],
        },

        phonenumber: {
            type: String,
            required: [true, "Please enter a password."],
            minlength: 8,
        },
        role: {
            type: String,
            enum: ["seller", "buyer"],
            default: "buyer",
        },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;

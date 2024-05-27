const express = require("express");
const userController = require("../Controllers/UserController");


const verify = require("../Utils/Verifytoken");

const router = express.Router();

router.route("/signup").post(userController.signup);

router.route("/signin").post(userController.signin);

router.route("/signout").post(userController.signout);

router.route("/:id").get(userController.sellerDetails);


router.route("/verify").get(verify.verifyToken, userController.verify);

 



module.exports = router;

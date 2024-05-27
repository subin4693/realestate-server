const express = require("express");
const PropertyConroller = require("../Controllers/PropertyConroller");
const verify = require("../Utils/Verifytoken");

const router = express.Router();


router.route("/create-new").post(verify.verifyToken,PropertyConroller.createnewProperty);

router.route("/delete/:id").delete(verify.verifyToken,PropertyConroller.deleteProperty);

router.route("/edit/:id").put(verify.verifyToken,PropertyConroller.editProperty);
router.route("/dashboard").get(verify.verifyToken,PropertyConroller.getPropertyForDashboard)
router.route("/").get(PropertyConroller.getAllPropertys);
router.route("/:id").get(verify.verifyToken,PropertyConroller.getSingleProperty);





 



module.exports = router;

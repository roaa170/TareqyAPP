const express = require("express");

const {
 signup ,
 verifySignupSMS,
 verifySignupEmail,
 verifiedCode,
 login ,
 forgotPassword ,
 verifyPassResetCode , 
 resetPassword,
 forgotPasswordSMS,
 SendReport
} = require("../ٍServices/authService");

const {
 signupValidator ,
 loginValidator
} = require("../utils/Validators/authValidator");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.post("/verifiedSignUp", verifySignupEmail);
//router.post("/verifiedSignUpSMS", verifySignupSMS);
router.post("/verifyCode", verifiedCode);
router.route("/login").post(loginValidator, login);
router.post('/forgotPassword', forgotPassword);
router.post('/forgotPasswordSMS', forgotPasswordSMS);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);
router.put('/SendReport', SendReport);



//router.route("/:id").get(getUserValidator, getUser).put(updateUserValidator, updateUser).delete(deleteUserValidator, deleteteUser);
module.exports = router;
/*router.route("/:id").get(getUser);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteteUser);*/
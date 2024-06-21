const express = require("express");


const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteteUser,
  changeUserPassword,
  userImage
} = require("../ٍServices/userServics");

const {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator
} = require("../utils/Validators/userValidator");


const router = express.Router();

router.put('/changePassword/:id' , changeUserPasswordValidator , changeUserPassword )

router.route("/").get(getUsers).post(userImage, createUserValidator, createUser);


/*router.route("/:id").get(getUser);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteteUser);*/
router.route("/:id").get(getUserValidator, getUser).put(updateUserValidator,userImage ,updateUser).delete(deleteUserValidator, deleteteUser);
module.exports = router;

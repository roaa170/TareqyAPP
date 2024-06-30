const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const multer = require('multer')
// const slugify = require('slugify')
const expressAsyncHandler = require("express-async-handler")

const ApiError = require("../utils/apiError");

const {uploadImage} = require("../middlewares/uploadImageMiddleware")

const {User} = require('../models/User_Schema')

// upload image
exports.userImage = uploadImage('profileImg')



//@desc  get all users
//access private
exports.getUsers =expressAsyncHandler( 
    async(req, res) => {
    const users = await User.find({})
     res.status(200).json({results:users.length , data:users})
})
//@desc create user
//access private
exports.getUser = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const user = await User.findOne({ _id: id });
    if(!user){
        //res.status(404).json({msg:`no user for this name `})
       return next(new ApiError (`no user for this id `,404))
    } res.status(200).json({data:user})


})
//@desc create user
//access private
exports.createUser = expressAsyncHandler(
async(req, res) => {
   // ** const {name} = req.body
    const user = await User.create(
       // ** { name, slugs: slugify(name) }
       req.body
        )
    res.status(201).json({ data: user })
  
})
//@desc update specific user --update name
//route Put /api/user/:id
//access public
/*exports.updateUser = expressAsyncHandler(async(req,res,next)=>{
  
   console.log(req.body)
    const user= await User.findByIdAndUpdate(
      
      req.params.id , req.body ,{new:true}
    )
    if(!user){
       
        return next(new ApiError (`no user for this id `,404))

    }
     res.status(200).json({data:user})
})*/

exports.updateUser = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);

  // تحقق من وجود المستخدم قبل محاولة التحديث
  const user = await User.findById(req.params.id);
  if (!user) {
      return next(new ApiError('No user found for this ID', 404));
  }

  // إذا كانت كلمة المرور موجودة في الطلب وتم تعديلها، قم بتشفيرها
  if (req.body.password) {
      const salt = await bcrypt.genSalt(12);
      req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  // تحديث المستخدم مع الخيارات الصحيحة
  const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, context: 'query' }
  );

  if (!updatedUser) {
      return next(new ApiError('Error updating user', 500));
  }

  res.status(200).json({ data: updatedUser });
});

exports.changeUserPassword = expressAsyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(
      req.params.id,
      {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
      },
      {
        new: true,
      }
    );
  
    if (!document) {
      return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });

//@desc delete specific user --update name
//route delete /api/user/:id
//access private
exports.deleteteUser = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const user= await User.findByIdAndDelete(id)
    if(!user){
      // **  res.status(404).json({msg:`no user for this id `})
        return next(new ApiError (`no user for this id `,404))

    } res.status(204).send()
})
 


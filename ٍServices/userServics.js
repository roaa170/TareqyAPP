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
    //.then(user  )
    //.catch(err=>res.status(400).send(err))    
    //  const newUser = new User({ name })
    // newUser.save().then(doc => res.json(doc)).catch(err => res.json(err))
})
//@desc update specific user --update name
//route Put /api/user/:id
//access public
exports.updateUser = expressAsyncHandler(async(req,res,next)=>{
    //** const {id} = req.params
    // console.log(id)
    // res.json({data:id})
   //** const newName =req.body.name
   console.log(req.body)
    const user= await User.findByIdAndUpdate(
       //** */ {_id:id}, {name:newName ,slugs: slugify(newName) } ,{new:true}
      req.params.id , req.body ,{new:true}
    )
    if(!user){
       //**  */ res.status(404).json({msg:`no user for this id `})
        return next(new ApiError (`no user for this id `,404))

    }
     res.status(200).json({data:user})
})
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
 


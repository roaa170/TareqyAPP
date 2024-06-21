const { v4: uuidv4 } = require('uuid');

const multer = require('multer')

const ApiError = require("../utils/apiError");

exports.uploadImage = (fieldName)=>{
    const multiStorage= multer.diskStorage({
    destination: function(req,file,cb){
    cb(null ,'uploads/users' )
    },
    filename: function(req,file,cb){
      const ext =file.mimetype.split('/')[1];
      const filename = `user-${uuidv4()}-${Date.now()}.${ext}`;
      cb(null , filename)
      req.body.profileImg = filename
    }
  })
  const multiFilter = function(req,file,cb){
    if (file.mimetype.startsWith('image')){
      cb(null , true)
    }else
    {cb(new ApiError("Only Images Allowed",400), false)}
  }
  
  const upload = multer({storage:multiStorage , fileFilter:multiFilter})

  return upload.single(fieldName)
}
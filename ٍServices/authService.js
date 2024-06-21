const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const axios = require('axios');
const {User} = require("../models/User_Schema");
const ApiError = require("../utils/apiError");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");
const createToken = require("../utils/createToken");



//@desc signup
//route  POST/api/auth/signup
//access public

/*exports.signup = asyncHandler(async (req, res, next) => {

  const response = await axios.get('http://localhost:1337/api/driver');
  const driverData = response.data;

  // التكرار عبر جميع العناصر في مصفوفة data
  driverData.data.forEach((item, index) => {
    const NID = item.attributes.NID;
    console.log(`NID of item ${index + 1}:`, NID);
  });




  // 2)  Generate hash reset random 6 digits and save it in db
  const verifiedCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedVerifiedCode = crypto
    .createHash("sha256")
    .update(verifiedCode)
    .digest("hex");
 //create user
 const user = await User.create({
   name: req.body.name,
   NID: req.body.NID,
   email: req.body.email,
   password: req.body.password,
   verifiedCode : hashedVerifiedCode,
   verifiedCodeExpires : Date.now() + 10 * 60 * 1000,
   verifiedCodeVerified :false,
   phoneNumber: req.body.phoneNumber,
  
 
 });
 // create token
 const token = createToken(user._id);
 
 // 3) Send the reset code via sms

 const message = `Hi ${user.name},\n We received a request to verify your account on your Tareqy Account. \n ${verifiedCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Tareqy Team`;
 
 const to = req.body.phoneNumber;

 try {
    await sendSMS(message, to);
     console.log("doneee sms");
   console.log(to);
 } catch (err) {
   user.verifiedCode = undefined;
   user.verifiedCodeExpires = undefined;
   user.verifiedCodeVerified = undefined;

   await user.save();
   return next(new ApiError("There is an error in sending sms", 500));
 }

 res.status(201).json({ data: user, token });
 //res.status(201).json({ data: user, token })
});*/






/*exports.signup = asyncHandler(async (req, res, next) => {

  try {
    // جلب البيانات من API
    const response = await axios.get('http://localhost:1337/api/driver');
    const driverData = response.data;

    // NID الذي أدخله المستخدم
    const userNID = req.body.NID;

    // التحقق من وجود NID المدخل ضمن العناصر المسترجعة
    const matchedItem = driverData.data.find(item => item.attributes.NID === userNID);

    if (matchedItem) {
      // جلب جميع المعلومات المتعلقة بالعنصر الذي تطابق NID الخاص به
      const { name, phone, NID , vehicles } = matchedItem.attributes;
      

      // توليد كود تحقق وتجزئته
      const verifiedCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedVerifiedCode = crypto
        .createHash("sha256")
        .update(verifiedCode)
        .digest("hex");

      // إنشاء مستخدم جديد وتخزينه في قاعدة البيانات
      const user = await User.create({
        name: name, // استخدام الاسم من العنصر المطابق
        NID: NID, // استخدام NID من العنصر المطابق
        email: req.body.email,
        password: req.body.password,
        verifiedCode: hashedVerifiedCode,
        verifiedCodeExpires: Date.now() + 10 * 60 * 1000,
        verifiedCodeVerified: false,
        phoneNumber: phone, // استخدام رقم الهاتف من العنصر المطابق
        vehicles: [vehicles]
      });
      // create token
 const token = createToken(user._id);
 
 // 3) Send the reset code via sms

 const message = `Hi ${user.name},\n We received a request to verify your account on your Tareqy Account. \n ${verifiedCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Tareqy Team`;
 
 const to = req.body.phone;

 try {
    await sendSMS(message, to);
     console.log("doneee sms");
   console.log(to);
 } catch (err) {
   user.verifiedCode = undefined;
   user.verifiedCodeExpires = undefined;
   user.verifiedCodeVerified = undefined;

   await user.save();
   return next(new ApiError("There is an error in sending sms", 500));
 }

 res.status(201).json({ data: user, token });
 //res.status(201).json({ data: user, token })

      res.status(201).json({
        status: 'success',
        data: {
          user
        }
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'NID not found in the provided data.'
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while processing your request.'
    });
  }
  
  
});*/



exports.signup = asyncHandler(async (req, res, next) => {
  try {
    // جلب البيانات من API
    const response = await axios.get('https://tareqyapi-10.onrender.com/api/driver?populate=*');
    const driverData = response.data;

    // NID الذي أدخله المستخدم
    const userNID = req.body.NID;

    // التحقق من وجود NID المدخل ضمن العناصر المسترجعة
    const matchedItem = driverData.data.find(item => item.attributes.NID === userNID);

    if (matchedItem) {
      // جلب جميع المعلومات المتعلقة بالعنصر الذي تطابق NID الخاص به
      const { name, phone, NID, vehicles } = matchedItem.attributes;

      

      // توليد كود تحقق وتجزئته
      const verifiedCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedVerifiedCode = crypto
        .createHash("sha256")
        .update(verifiedCode)
        .digest("hex");

      // إنشاء مستخدم جديد وتخزينه في قاعدة البيانات
      const user = await User.create({
        userName:req.body.userName,
        name,
        NID,
        email: req.body.email,
        password: req.body.password,
        verifiedCode: hashedVerifiedCode,
        verifiedCodeExpires: Date.now() + 10 * 60 * 1000,
        verifiedCodeVerified: false,
        phoneNumber: phone,
        vehicles 
      });

      // إنشاء توكن
      const token = createToken(user._id);

      // إرسال رمز التحقق عبر الرسائل النصية
      const message = `Hi ${user.name},\n We received a request to verify your account on your Tareqy Account. \n ${verifiedCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Tareqy Team`;

      const to = phone;

      try {
        await sendSMS(message, to);
        console.log('SMS sent successfully to:', to);
      } catch (err) {
        // في حالة فشل إرسال رمز التحقق عبر SMS، نقوم بإعادة تعيين الحقول ذات الصلة
        user.verifiedCode = undefined;
        user.verifiedCodeExpires = undefined;
        user.verifiedCodeVerified = undefined;

        await user.save();
        return next(new ApiError('There is an error in sending sms', 500));
      }

      res.status(201).json({ data: user, token });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'NID not found in the provided data.'
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while processing your request.'
    });
  }
});











//@desc verify
//route  POST/api/auth/verifySMS
//access public
/*exports.verifySignupSMS = asyncHandler(async (req, res, next) => {
  // get the user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const verifiedCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedVerifiedCode = crypto
    .createHash("sha256")
    .update(verifiedCode)
    .digest("hex");
  // Save hashed password reset code into db
  user.verifiedCode = hashedVerifiedCode;
  // Add expiration time for password reset code (10 min)
  user.verifiedCodeExpires = Date.now() + 10 * 60 * 1000;
  user.verifiedCodeVerified = false;

  await user.save();
  // 3) Send the reset code via sms

  const message = `Hi ${user.name},\n We received a request to verify your account on your Tareqy Account. \n ${verifiedCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Tareqy Team`;
  //const to = parseInt(req.body.phoneNumber, 10);
  const to = req.body.phoneNumber;

  try {
     await sendSMS(message, to);
    res
      .status(200)
      .json({ status: "Success", message: `Reset code sent to  ` });
      console.log("doneee sms");
    console.log(to);
  } catch (err) {
    // console.log(err);
    user.verifiedCode = undefined;
    user.verifiedCodeExpires = undefined;
    user.verifiedCodeVerified = undefined;

    await user.save();
    return next(new ApiError("There is an error in sending sms", 500));
  }
});*/

//@desc verify
//route  POST/api/auth/verify
//access public
exports.verifySignupEmail = asyncHandler(async (req, res, next) => {
  // get the user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const verifiedCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedVerifiedCode = crypto
    .createHash("sha256")
    .update(verifiedCode)
    .digest("hex");
  // Save hashed password reset code into db
  user.verifiedCode = hashedVerifiedCode;
  // Add expiration time for password reset code (10 min)
  user.verifiedCodeExpires = Date.now() + 10 * 60 * 1000;
  user.verifiedCodeVerified = false;

  await user.save();
  // 3) Send the reset code via email

  const message = `Hi ${user.name},\n We received a request to verify your account on your Tareqy Account. \n ${verifiedCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Tareqy Team`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your verified code (valid for 10 min)",
      message,
    });
    res
      .status(200)
      .json({ status: "Success", message: "Reset code sent to email" });
  } catch (err) {
    user.verifiedCode = undefined;
    user.verifiedCodeExpires = undefined;
    user.verifiedCodeVerified = undefined;

    await user.save();
    return next(new ApiError("There is an error in sending email", 500));
  }
});

// @desc    Verify code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifiedCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedVerifiedCode = crypto
    .createHash("sha256")
    .update(req.body.verifiedCode)
    .digest("hex");

  const user = await User.findOne({
    verifiedCode: hashedVerifiedCode,
    verifiedCodeExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Reset code invalid or expired"));
  }

  // 2) Reset code valid
  user.verifiedCodeVerified = true;
  await user.save();

  res.status(200).json({
    status: "Success",
  });
});

//@desc log in
//route  POST /api/auth/login
//access public
exports.login = asyncHandler(async (req, res, next) => {
  // check if email and password in the body
  // check if user is exist and password is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Incorrect email or password", 401));
  }
  //generate token
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});
// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // get the user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();
  // 3) Send the reset code via email

  const message = `Hi ${user.name},\n We received a request to reset the password on your Tareqy Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Tareqy Team`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valid for 10 min)",
      message,
    });
    res
      .status(200)
      .json({ status: "Success", message: "Reset code sent to email" });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError("There is an error in sending email", 500));
  }
});

// @desc    Forgot password (SMS)
// @route   POST /api/v1/auth/forgotPassword
// @access  Public

exports.forgotPasswordSMS = asyncHandler(async (req, res, next) => {
  // get the user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save();
  // 3) Send the reset code via email

  const message = `Hi ${user.name},\n We received a request to reset the password on your Tareqy Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Tareqy Team`;
  try {
    await sendSMS({
      to: user.phoneNumber,
      message,
    });
    res
      .status(200)
      .json({ status: "Success", message: "Reset code sent to email" });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();
    return next(new ApiError("There is an error in sending email", 500));
  }
});

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Reset code invalid or expired"));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save();

  res.status(200).json({
    status: "Success",
  });
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code not verified", 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = createToken(user._id);
  res.status(200).json({ token });
});


// send reports 
exports.SendReport = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check 
  if (!user) {
    return next(new ApiError("Reset code not verified", 400));
  }

  user.reports.push(req.body.reports)
  await user.save();
  res.status(201).json(user);
  
});



// جلب البيانات من API
async function fetchData() {
  try {
    const response = await axios.get('http://localhost:1337/api/driver');
    const driverData = response.data;

    // التكرار عبر جميع العناصر في مصفوفة data
    driverData.data.forEach((item, index) => {
      const NID = item.attributes.NID;
      console.log(`NID of item ${index + 1}:`, NID);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
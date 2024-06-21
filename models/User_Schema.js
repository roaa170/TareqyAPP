/*const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const { Int32, Decimal128 } = require("mongodb");


// Define the sub-schema for vehicles
const vehicleSchema = mongoose.Schema({
srt_LicenseDate : Date ,
exp_LicenseDate : Date ,
department: String,
car_plate: String,
carModel: String,
carType:String,
usedFor: String,
date: [Date],
camNo:[String],
road:[String],
images: [String],
fees:[mongoose.Schema.Types.Decimal128]
},

)

const userSchema = mongoose.Schema(
  {
   

  userName: String,
  name: {
    type: String,
    trim: true,
    required: [true, "اسم المستخدم مطلوب"],
  },
  NID: {
    type: String,
    trim: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  profileImg: String,
  password: {
    type: String,
    minlength: [6, "كلمة المرور قصيرة جداً"],
  },
  passwordChangedAt: Date,
  passwordResetCode: String,
  passwordResetExpires: Date,
  passwordResetVerified: Boolean,
  verifiedCode: String,
  verifiedCodeExpires: Date,
  verifiedCodeVerified: Boolean,
  reports: [String],
  slugs: {
    type: String,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
 vehicles : [vehicleSchema]
},
{ timestamps: true }

);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("Users", userSchema);

 module.exports = {User , vehicleSchema};*/



 const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { json } = require("express");

// Define the sub-schema for vehicles
const vehicleSchema = mongoose.Schema({
  str_LicenseDate: Date,
  exp_LicenseDate: Date,
  department: String,
  car_plate: String,
  carModel: String,
  carType: String,
  usedFor: String,
  date: [Date],
  camNo: [String],
  road: [String],
  images: [String],
  fees: mongoose.Schema.Types.Decimal128,
});

const userSchema = mongoose.Schema(
  {
    userName: String,
    name: {
      type: String,
      trim: true,
      required: [true, "اسم المستخدم مطلوب"],
    },
    NID: {
      type: String,
      trim: true,
      unique: true,
    },
    dateOfBirth: {
      type: Date,
      default: Date.now,
    },
    phoneNumber: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImg: String,
    password: {
      type: String,
      minlength: [6, "كلمة المرور قصيرة جداً"],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    verifiedCode: String,
    verifiedCodeExpires: Date,
    verifiedCodeVerified: Boolean,
    reports: [String],
    slugs: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    vehicles: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = { User, vehicleSchema };




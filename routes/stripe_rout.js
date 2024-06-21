const express = require("express");

const { stripe } = require("../ٍServices/Stripe");

console.log(stripe);
const router = express.Router();
router.post("/stripe-payment", stripe);
console.log("success");
module.exports = router;

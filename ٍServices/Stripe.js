//require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET);

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

//exports.con = ()=>console.log(stripePublicKey ,stripeSecretKey);

const stripetest = require('stripe')(stripeSecretKey);
const express = require("express");

const User = require("../models/User_Schema");

const route = express();


exports.stripe = async (req, res) => {
    try {
        const paymentIntent = await stripetest.paymentIntents.create({
            name: req.user.name,
            amount: parseInt(req.query.amount, 10),
             
            currency: req.query.currency,
        });

        res.json({
            paymentIntent: paymentIntent.client_secret,
            paymentIntentData: paymentIntent,
            amount: req.body.amount,
            currency: req.body.currency
        });
    } catch (error) {
        console.log(error);
        res.json({ "error": error });
    }
}
/*exports.stripe = async (req, res) => {
     // ) Create stripe checkout session
     const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            name: req.user.name,
            amount: req.body.totalOrderPrice * 100,
            currency: 'egp',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/`,
        cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
        customer_email: req.user.email,
      });
    
      // 4) send session to response
      res.status(200).json({ status: 'success', session });
 
  
} */
console.log("Doneee");


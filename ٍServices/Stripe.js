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
 
console.log("Doneee");


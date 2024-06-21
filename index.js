const path = require('path')
//////////
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);
////////////
//const path = require('path');
//const mongoose = require('mongoose');

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const {User, vehicleSchema } = require('./models/User_Schema');


//const cors = require('cors');
//const compression = require('compression');
//const rateLimit = require('express-rate-limit');
//const hpp = require('hpp');
//const { error } = require('console');


//const paypall = require('./ٍServices/Paypal')

require("dotenv").config();

const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddlrware");
const dbConnection = require("./connection/databade");

const app = express();
dotenv.config({ path: "config.env" });

//MiddleWare
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')))
dbConnection();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
const { con } = require("./ٍServices/Stripe");

//con()

//routes
const userRoute = require("./routes/user_rout");
const authRoute = require("./routes/auth_rout");
const Stripe = require("./routes/stripe_rout");


app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.send("our App");
}); 
app.get('/paypal', (req, res) => {
  res.render('index', );
});
app.get("/cancel", (req, res) => {
  res.send("cancled");
});
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/stripe", Stripe);
// Post data 
app.post('/users/vehicles', async (req, res) => {
  try {
   const user = await User.findById(req.body.id);
   //const user = await User.findOne({ 'vehicles.car_plate': req.params.car_plate });
   if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.vehicles.push(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.put('/users/:car_plate/vehicles', async (req, res) => {
  try {
    const carPlate = req.params.car_plate;
    //const newRoad = req.body.road;
    const { road, date, camNo, image , fees} = req.body;
    // Use findOneAndUpdate with an update modifier
    const user = await User.findOneAndUpdate(
      { 'vehicles.car_plate': carPlate },
      { $push: { 
        'vehicles.$.road': road ,
        'vehicles.$.date': date,
          'vehicles.$.camNo': camNo,
          'vehicles.$.image': image,
          'vehicles.$.fees': fees,

      } 
    
    },
      { new: true } // To return the updated user document
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const vehicleIndex = user.vehicles.findIndex(vehicle => vehicle.car_plate === carPlate);
    if (vehicleIndex === -1) {
      return res.status(400).json({ error: 'Vehicle with specified car plate not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get(`/users/:car_plate/vehicles`, async (req, res, next) => {
  try {
    const user = await User.findOne({ 'vehicles.car_plate': req.params.car_plate });

    if (!user) {
      return next(new ApiError('No user found for this car plate', 404));
    }

    const vehicle = user.vehicles.find(v => v.car_plate === req.params.car_plate);

    if (!vehicle) {
      return next(new ApiError('No vehicle found for this car plate', 404));
    }

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
});




app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// global handeling errors
app.use(globalError);

//******* */

/*
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

console.log(stripePublicKey ,stripeSecretKey);


const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

 
 /*********** */

const PORT = process.env.PORT || 8000;
//const PORT =  4000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
//Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`'unhandledRejection'Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("shutting down....");
    process.exit(1);
  });
});

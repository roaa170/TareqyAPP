// eslint-disable-next-line import/no-extraneous-dependencies
const twilio = require("twilio")

// Your Twilio Account SID and Auth Token
// Create Twilio client
// Function to send SMS
const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS= (body , to)=> {
 client.messages
    .create({
        body: body,
        from: '+14234543130',
        to: to
    })
    .then(message => console.log(message.sid))
    // .done();
  }
module.exports = sendSMS;
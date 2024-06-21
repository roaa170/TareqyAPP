const { CURSOR_FLAGS } = require("mongodb");
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // create transporter
   const transporter = nodemailer.createTransport({
       // host: process.env.EMAIL_HOST,
       // port: process.env.EMAIL_PORT, // if secure false port = 587, if true port= 465
       // secure: true,
       //service: "gmail" ,
       host: process.env.EMAIL_HOST,
       port: process.env.EMAIL_PORT,
       secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        
        },
      });


    ///////////////////////////////////


      /*const transporter = nodemailer.createTransport({
        // service:"gmail",
        host: "smtp.gmail.com",//"roaa.amin1701@gmail.com",
        port: 465,//2525,
        auth: {
          user: "roaa.amin1701@gmail.com",
          pass: "Roaaamin2002"
        }
      });*/




  // 2) Define email options (like from, to, subject, email content)
  const mailOpts = {
    from: 'Tareqy <tareqy816@gmail.com>',
    to: options.email,
    //to: 'botaylaamin@gmail.com',
    subject: options.subject,
    text: options.message,
  };

  // 3) Send email
  console.log("zakyyyyyyyyyyyy")

  await transporter.sendMail(mailOpts);
  console.log("zakyyyyyyyyyyyy")

};
module.exports = sendEmail;

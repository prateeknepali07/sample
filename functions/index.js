const functions = require('firebase-functions');
const nodemailer = require("nodemailer");

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.mail = functions.https.onRequest((request, response) => {
  const mailTo = "vomaksh@gmail.com";
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'collectionnumber@gmail.com', 
        pass: 'AkShay@123' 
    }
  });
   const mailOptions = {
      from: 'collectionnumber@gmail.com', // sender address
      to: mailTo, // list of receivers
      subject: 'I am in danger', // Subject line
      html: '<p>Your html here</p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        {console.log(err);
        response.send(err);}
      else
        {console.log(info);
        response.send(info)}
   });
})
var nodemailer = require('nodemailer');


let mailer = function(email,callback)
{

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'meanstack4@gmail.com',
    pass: 'mean@1234'
  }
});

var mailOptions = {
  from: 'meanstack4@gmail.com',
  to: email,
  subject: 'Verification mail!!!',
  html: "<h1>Welcome to SocialDocApp.com</h1><br>You have successfully registered on SocialDocApp.com ,your login credentials are<br><br><b>Username : "+email+"</b><br><b>Password : </b><br><h3>click on link below to verify account</h3><br>http://localhost:3000/users/verify_account?email="+email
};

transporter.sendMail(mailOptions, function(error, info){
   callback(error,info);
}); 
}

module.exports={mailer:mailer};
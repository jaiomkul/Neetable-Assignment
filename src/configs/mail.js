const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "187e243beaf8f9", // generated ethereal user
    pass: "016d0789d9efb7", // generated ethereal password
  },
});

module.exports = transporter;

const User = require("../models/user.model");

const transporter = require("../configs/mail");

const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ user }, "neetable");
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    //checking email
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // if new user, create it or allow to register;
    user = await User.create(req.body);

    const token = newToken(user);

    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    //checking email
    if (!user) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    //if email exists, check password
    const match = user.checkPassword(req.body.password);

    // if doesn't match
    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    // if it matches
    const token = newToken(user);

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"User" <jaygupta2601@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Login Successfully ✔", // Subject line
      text: `We noticed a new sign-in to your Google Account on a new device. If this was you, you don’t need to do anything. If not, we’ll help you secure your account.`, // plain text body
      html: "<b>We noticed a new sign-in to your Google Account on a new device. If this was you, you don’t need to do anything. If not, we’ll help you secure your account.</b>", // html body
    });
    return res.status(200).send({ Success: "true", user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { register, login };

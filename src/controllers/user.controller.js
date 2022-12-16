require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const router = express.Router();

const newToken = (user) => {
  return jwt.sign({ foo: "bar" }, process.env.TOKENKEY);
};

router.post("/register", async (req, res) => {
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
});

router.get("/register", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send({ users: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.get("/register/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id).lean().exec();

    return res.status(200).send({ users: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.patch("/register/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/register/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send({ message: "Delete successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;

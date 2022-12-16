require("dotenv").config();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: Number, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: false },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    birthdate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// /*How hashed password work
//   let hashedPassword = this.password + "extra";
//   this.password = hashedPassword;
//   this.confirmPassword = hashedPassword;
//   return next();*/

userSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, Number(process.env.SALT));
  this.password = hash;
  this.confirmPassword = hash;
  return next();
  // let hashedPassword = this.password + "extra";
  // this.password = hashedPassword;
  // this.confirmPassword = hashedPassword;
  // return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password); // true
};

const User = mongoose.model("user", userSchema);

module.exports = User;

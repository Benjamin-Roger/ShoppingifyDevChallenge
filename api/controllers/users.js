const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt");

const User = require("../db/models/Users");

var connectionString = process.env.MONGODB_CONNECTION_STRING;

exports.signup = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

exports.login = async (req, res, next) => {
  // Open connection
  const connector = mongoose.connect(connectionString, {
    useNewUrlParser: true,
  });

  // Get all lists from the DB
  let user = await connector.then(async () => {
    return await User.findOne({ email: req.body.email });
  });

  try {
    if (!user) {
      return res.status(401).json({
        error: new Error("User not found!"),
      });
    }
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({
            error: new Error("Incorrect password!"),
          });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(200).json({
          userId: user._id,
          token: token,
        });
      })
      .catch((error) => {
        console.log("in bcrypt", error);

        res.status(500).json({
          error: error,
        });
      });
  } catch (error) {
    console.log("end", error);

    res.status(500).json({
      error: error,
    });
  }
};

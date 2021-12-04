const User = require("../models/userModel");
//import User from "../models/userModel";
const asynchandler = require("express-async-handler");
//import asynchandler from "express-async-handler";
const generateToken = require("../utils/generateToken");
//import generateToken from "../utils/generateToken";

const registerUser = asynchandler(async (req, res) => {
  const { name, username, email, password, mailingaddress, billingaddress, paymenttype, location } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    username,
    password,
    mailingaddress,
    billingaddress,
    paymenttype,
    location,
    //picture,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      mailingaddress: user.mailingaddress,
      billingaddress: user.billingaddress,
      paymenttype: user.paymenttype,
      location: user.location,
      //picture: user.picture,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Error occured !");
  }

  res.json({
    name,
    email,
    mailingaddress,
    billingaddress,
    paymenttype,
    location,
  });
});

const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      mailingaddress: user.mailingaddress,
      billingaddress: user.billingaddress,
      paymenttype: user.paymenttype,
      location: user.location,
      isAdmin: user.isAdmin,
      //pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const updateUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.name || user.username;
    user.email = req.body.email || user.email;
    user.mailingaddress = req.body.mailingaddress || user.mailingaddress;
    user.billingaddress = req.body.billingaddress || user.billingaddress;
    user.paymenttype = req.body.paymenttype || user.paymenttype;
    user.location = req.body.location|| user.location;



    //user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      mailingaddress: updatedUser.mailingaddress,
      billingaddress: updatedUser.billingaddress,
      paymenttype: updatedUser.paymenttype,
      location: updatedUser.location,
      //pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


module.exports = { registerUser, authUser, updateUserProfile };
//export { authUser, updateUserProfile, registerUser };

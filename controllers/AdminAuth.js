const express = require("express");
const Admin = require("../models/Admin");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      message: errors.array()[0].msg,
    });
  }

  const { email, password: plainTextPassword } = req.body;

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ message: "Invalid Password" });
  }
  const password = await brcypt.hash(plainTextPassword, 10);

  try {
    const response = await Admin.create({
      email,
      password,
    });
    const user = await Admin.findOne({ email }).lean();
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET
    );
    const id = user._id;
    return res.status(201).json({ message: "Succesfully Registered", token , id});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({
      message: errors.array()[0].msg,
    });
  }
  const user = await Admin.findOne({ email }).lean();
  console.log(user);
  if (!user) {
    return res.json({ message: "Invalid email/password" });
  }
  const id = user._id;
  if (await brcypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET
    );
    return res.json({ message: "Sucessfully Logged In", token , id });
  } else {
    return res.json({ message: "Password mismatch" });
  }
};

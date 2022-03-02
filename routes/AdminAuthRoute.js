const express = require("express");
const router = express.Router();
const {signup, signin} = require('../controllers/AdminAuth')
const { check, validationResult } = require("express-validator");

router.post('/register',
   [
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
signup)

router.post('/login',
   [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
  ],
  signin)

module.exports = router


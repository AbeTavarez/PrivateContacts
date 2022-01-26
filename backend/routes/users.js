const express = require("express");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const router = express.Router();

//* @routes POST api/users
//* @desc Register a user
//* @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please add a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with six or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //* Check if user exist
      let user = await User.findOne({ email });

      //* if user already exist
      if (user) {
        return res.status(400).json({ msg: "User already exist." });
      }
      // *Create new User
      user = new User({ name, email, password });
      // * Encrypt password
      const SALT = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, SALT);
      await user.save();

      // Payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.status(201).json({ token });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;

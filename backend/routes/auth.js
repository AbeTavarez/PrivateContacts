const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

//* @routes GET api/auth
//* @desc Get logged in user
// @access Private
router.get('/', (req, res) => {
    res.status(200).json({msg: 'Get logged in user'})
});

//* @routes POST api/auth
//* @desc Login and get token
// @access Public
router.post('/',[
    check('email', 'Please add a valid email.').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) { //! if we CAN'T find a user
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const isMath = await bcrypt.compare(password, user.password);

        if (!isMath) { //! if password is NOT a match
            return res.status(400).json({msg: 'Invalid Credentials'})
        }

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
    }
});

module.exports = router;
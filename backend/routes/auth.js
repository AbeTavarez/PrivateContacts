const express = require('express');

const router = express.Router();

// @routes GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', (req, res) => {
    res.status(200).json({msg: 'Get logged in user'})
});

// @routes POST api/auth
// @desc Auth user and get token
// @access Public
router.post('/', (req, res) => {
    res.status(200).json({msg: 'Login user'});
});

module.exports = router;
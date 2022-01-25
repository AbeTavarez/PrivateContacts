const express = require('express');

const router = express.Router();

// @routes POST api/users
// @desc Register a user
// @access Public
router.post('/', (req, res) => {
    res.status(200).json({msg: 'register a user'})
});

module.exports = router;
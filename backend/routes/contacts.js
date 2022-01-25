const express = require('express');

const router = express.Router();

// @routes GET api/contacts
// @desc Get all users contacts
// @access Private
router.get('/', (req, res) => {
    res.status(200).json({msg: 'get all contacts'})
});

// @routes POST api/contacts
// @desc Add new contact
// @access Private
router.post('/', (req, res) => {
    res.status(200).json({msg: 'add contact'})
});

// @routes PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put('/:id', (req, res) => {
    res.status(200).json({msg: 'update contact'})
});

// @routes DELETE api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id', (req, res) => {
    res.status(200).json({msg: 'delete contact'})
});

module.exports = router;
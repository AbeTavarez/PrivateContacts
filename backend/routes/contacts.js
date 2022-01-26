const express = require('express');
const { check, validationResult } = require("express-validator");
const authVerifyToken = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
//
const router = express.Router();

//* @routes GET api/contacts
//* @desc Get all users contacts
//* @access Private
router.get('/', authVerifyToken, async (req, res) => {

    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
});

//* @routes POST api/contacts
//* @desc Add new contact
//* @access Private
router.post('/',[authVerifyToken, [
    check('name', 'Name is required').not().isEmpty()
]],  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    const {name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({name, email, phone, type, user: req.user.id});
        const contact = await newContact.save();

        res.status(201).json({contact});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
});

//* @routes PUT api/contacts/:id
//* @desc Update contact
//* @access Private
router.put('/:id',authVerifyToken, async (req, res) => {
    const {name, email, phone, type} = req.body;

    //Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        // Check if contact exist
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({msg: 'Contact not found'});

        // Make sure user owns the contact
        if (contact.user.toString() !== req.user.id ) {
            return res.status(402).json({msg: 'Not authorized'})
        }
        // find and update contact
        contact = await  Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields},
            {new: true});

            res.status(200).json({contact});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
});

// @routes DELETE api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id',authVerifyToken, async (req, res) => {
    try {
        // Check if contact exist
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({msg: 'Contact not found'});

        // Make sure user owns the contact
        if (contact.user.toString() !== req.user.id ) {
            return res.status(402).json({msg: 'Not authorized'})
        }
        await Contact.findOneAndRemove(req.params.id);

            res.json({msg: 'Contact removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
});

module.exports = router;
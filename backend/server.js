const express = require('express');
require('dotenv').config()
const {connectDB} = require('./config/db');
const morgan = require('morgan');

// Files
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');

//
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routing
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactsRouter);

//
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Private Contacts API.'})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
    connectDB();
});
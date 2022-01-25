const express = require('express');

// Files
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');
const app = express();

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactsRouter);

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Private Contacts API.'})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
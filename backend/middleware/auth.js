const jwt = require('jsonwebtoken');

exports = (req, res, next) => {
    // get token from key x-auth-token in the header
    const TOKEN = req.header('x-auth-token');

    // Check if there is No token
    if (!TOKEN) {
        return res.status(401).json({msg: 'No token. Authorization denied!'})
    }

    // Verify TOKEN
    try {
        const decoded = jwt.verify(TOKEN, process.env.JWT_SECRET);
        // set the decoded user to the request
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}
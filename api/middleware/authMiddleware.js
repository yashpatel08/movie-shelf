const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            return res.status(401).json({ message: 'Token is not valid' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = auth;
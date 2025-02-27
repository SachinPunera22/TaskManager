const jwt = require('jsonwebtoken');
module.exports = async (payload) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    );
    return token;
};
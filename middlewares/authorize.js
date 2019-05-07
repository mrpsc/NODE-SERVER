const config = require('../configurations/config');
const jwt = require('jsonwebtoken');
exports.checkToken = function (req, res, next) {
    let token = req.header(config.auth_headerKey);
    if (!token) {
        return res.status(401).send({ message: 'Not token proovider' });
    }
    try {
        jwt.verify(token, config.jwt_secret);
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid token' });
    }
}
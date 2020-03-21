const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {return res.status(401).json({ msg: 'autorization denial' }) }

    try {
        const decode = jwt.verify(token, config.get('jwtSecred'));
        req.user = decode;
        next();

    } catch (e) {
        res.status(400).json({msg:'invalid token'})
    }



}
module.exports = auth;
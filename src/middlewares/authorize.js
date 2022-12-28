// this is a auhtorize middleware
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../environments/environment');

const authorize = (req, res, next) => {
    const { authorization } = req.headers;
    if( !authorization ) {
        return res.status(401).send({ message: 'UNAUTHORIZE' });
    }
    if( !authorization.startsWith('Bearer') ) {
        return res.status(401).send({ message: 'UNAUTHORIZE' });
    }
    const split = authorization.split('Bearer ');
    if( split.length !== 2 ) {
        return res.status(401).send({ message: 'UNAUTHORIZE' });
    }
    const token = split[1];
    try {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if( err ) {
                return res.status(401).send({ message: 'UNAUTHORIZE' });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(401).send({ message: 'UNAUTHORIZE' });
    }
} 

module.exports = authorize;
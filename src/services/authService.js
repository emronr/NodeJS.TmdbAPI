const users = require('../mocks/users.mock');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../environments/environment');

let refleshTokens = [];

const authService = {
    getUserByEmailAndPassword:  (email, password) => {
        return users.find(user => user.email === email && user.password === password);
    },
    login: async (email, password) => {
        if( !email || !password ) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        const user = authService.getUserByEmailAndPassword(email, password);
        if( !user ) {
            return res.status(401).json({ message: 'User not found!' });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refleshTokens.push(refreshToken);
        return {
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: 3600
        };
    },
    refreshToken: async (refleshToken) => {
        if( !refleshToken ) {
            return res.status(401).send({ message: 'UNAUTHORIZE' });
        }
        if( !refleshTokens.includes(refleshToken) ) {
            return res.status(403).send({ message: 'FORBIDDEN' });
        }
        jwt.verify(refleshToken, REFRESH_TOKEN_SECRET, (err, user) => {
            if( err ) {
                return res.status(401).send({ message: 'UNAUTHORIZE' });
            }
            const accessToken = generateAccessToken(user);
            return accessToken;
        });
    },
    logout: (token) => {
        refleshTokens = refleshTokens.filter(t => t !== token);
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET);
}

module.exports = authService;

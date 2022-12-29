const users = require('../mocks/users.mock');
const jwt = require('jsonwebtoken');
const errors = require('restify-errors');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../environments/environment');

let refreshTokens = [];

const authService = {
    getUserByEmailAndPassword: (email, password) => {
        return users.find(user => user.email === email && user.password === password);
    },
    login: async (email, password) => {
        if (!email || !password) {
            throw new errors.NotFoundError('Email and password are required.');
        }
        const user = authService.getUserByEmailAndPassword(email, password);
        if (!user) {
            throw new errors.UnauthorizedError('User not found!');
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        return {
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: 3600,
        };
    },
    refreshToken: async (refreshToken) => {
        let accessToken = "";
        let newRefreshToken = "";
        if (!refreshToken) {
            throw new errors.UnauthorizedError('UNAUTHORIZE!');
        }
        if (!refreshTokens.includes(refreshToken)) {
            throw new errors.HttpError('FORBIDDEN', 403);
        }
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new errors.UnauthorizedError('UNAUTHORIZE!');
            }
            accessToken = generateAccessToken(user);
            newRefreshToken = generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            refreshTokens.splice(refreshToken);
        });
        return {
            accessToken: accessToken,
            refreshToken: newRefreshToken
        };

    },
    logout: async (token) => {
        refreshTokens = refreshTokens.filter(t => t !== token);
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

const generateRefreshToken = (user) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET);
}

module.exports = authService;

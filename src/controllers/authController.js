// authentication controller
const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../environments/environment');

let refleshTokens = [];

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken, expiresIn } = await authService.login(email, password);
        res.status(200).send(
            {
                userId: user.userId,
                displayName: user.displayName,
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn : expiresIn
            });

    },
    token: async (req, res) => {
        const refleshToken = req.body.token;
        const { accessToken } = await authService.refreshToken(refleshToken);
        res.status(200).send({ accessToken: accessToken });
    },
    logout: (req, res) => {
        const { token } = req.params;
        authService.logout(token);
        res.status(204).send();
    }
}

module.exports = authController;

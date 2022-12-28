// authentication controller
const authService = require('../services/authService');

const authController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        await authService.login(email, password)
            .then(response => res.status(200).send({
                userId: response.user.userId,
                displayName: response.user.displayName,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                expiresIn: response.expiresIn
            }))
            .catch(err => next(err));


    },
    token: async (req, res, next) => {
        const refreshToken = req.body.refreshToken;
        await authService.refreshToken(refreshToken)
            .then(response =>
                res.status(200).send({
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken
                }))
            .catch(err => next(err));
    },
    logout: (req, res, next) => {
        const { token } = req.params;
        authService.logout(token)
            .then(response => res.status(204).send());
    }
}

module.exports = authController;

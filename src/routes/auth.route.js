const express = require('express');
const router = express.Router({ mergeParams: true });
const authController = require('../controllers/authController.js');

router.route('/login')
    .post(authController.login);

router.route('/token')
    .post(authController.token);

router.route('/logout/:token')
    .delete(authController.logout);

module.exports = router;
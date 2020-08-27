const express = require('express');

const { signupUser } = require('./controller');

const router = express.Router();

/**
 * Signups new User
 */
router.post('/', signupUser);

module.exports = { router, prefix: '/users' };

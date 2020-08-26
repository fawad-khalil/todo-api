const express = require('express');

const { signupUser } = require('./controller');

const router = express.Router();

/**
 * Signups new User
 */
router.put('/', signupUser);

module.exports = { router, prefix: '/users' };

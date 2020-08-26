/* npm modules */
const express = require('express');

/* local product packages */
const { signinUser, verifySession, deleteSession } = require('./controller');

/* data variables */
const router = express.Router();

/** Validate Session */
router.get('/', verifySession);
/** Signin User */
router.post('/', signinUser);
/** Signout User */
router.delete('/', deleteSession);

module.exports = { router, prefix: '/sessions' };

const fs = require('fs');
const jwt = require('jsonwebtoken');
const { jwtEncryptionAlgo } = require('../constants');

// use 'utf8' to get string instead of byte array  (512 bit key)
const privateKEY = fs.readFileSync(`${__dirname}/../config/private.key`, 'utf8').trim();
const publicKEY = fs.readFileSync(`${__dirname}/../config/public.key`, 'utf8').trim();

module.exports = {
	/* eslint-disable-next-line */
	sign: (payload, $Options) => {
		/*
		sOptions = {
			issuer: "Authorizaxtion/Resource/This server",
			subject: "iam@user.me",
			audience: "Client_Identity" // this should be provided by client
		}
		*/
		// Token signing options
		const signOptions = {
			// issuer: $Options.issuer,
			// subject: $Options.subject,
			// audience: $Options.audience,
			// expiresIn: "30d",    // 30 days validity
			algorithm: jwtEncryptionAlgo,
		};
		return jwt.sign(payload, privateKEY, signOptions);
	},
	/* eslint-disable-next-line */
	verify: (token, $Option) => {
		/*
		vOption = {
			issuer: "Authorization/Resource/This server",
			subject: "iam@user.me",
			audience: "Client_Identity" // this should be provided by client
		}
		*/
		const verifyOptions = {
			// issuer: $Option.issuer,
			// subject: $Option.subject,
			// audience: $Option.audience,
			// expiresIn: "30d",
			algorithm: jwtEncryptionAlgo,
		};
		try {
			return jwt.verify(token, publicKEY, verifyOptions);
		} catch (err) {
			return false;
		}
	},
	decode: (token) => jwt.decode(token, { complete: true }),
	// returns null if token is invalid
};

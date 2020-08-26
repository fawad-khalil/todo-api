const { insertDocument } = require('../../helper/mongoose');
const User = require('./model');
const { responseCodes, internal_server_error } = require('../../constants');

const signupUser = async (req, res) => {
	const { user } = req.body;
	const userDoc = new User(user);

	try {
		const insertResponse = await insertDocument(userDoc, 'User');

		res.status(insertDocument.code).json(insertResponse);
	} catch (error) {
		res.status(responseCodes.internalServerError).json({ message: internal_server_error, error });
	}
};

module.exports = {
	signupUser,
};

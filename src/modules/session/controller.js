const { createUserSession } = require('./helper');
const { makeResponseObj } = require('../../helper/utils');
const { nullUndefinedValidate } = require('../../helper/validator');
const { getValue, deleteKey } = require('../../helper/redis');
const {
	responseCodes, success_response_obj, fail_response_obj, internal_server_error,
} = require('../../constants');

const signinUser = async (req, res) => {
	const { email, password, shouldRemember } = req.body;

	try {
		const response = await createUserSession({ email, password, shouldRemember });

		res.status(response.code).json(response);
	} catch (error) {
		res.status(responseCodes.internalServerError).json({ message: internal_server_error, error });
	}
};

const verifySession = async (req, res) => {
	const sessionToken = req.get('Token');

	try {
		const fetchKey = await getValue(sessionToken);

		if (nullUndefinedValidate(fetchKey)) {
			const response = makeResponseObj(responseCodes.ok, 'Session verified.', fetchKey, {
				...success_response_obj,
			});

			res.status(response.code).json(response);
		} else {
			const error = makeResponseObj(
				responseCodes.unAuthorized,
				'Session not verified.',
				{},
				{
					...fail_response_obj,
				},
			);
			res.status(error.code).json(error);
		}
	} catch (error) {
		res.status(responseCodes.internalServerError).json({ message: internal_server_error, error });
	}
};

const deleteSession = (req, res) => {
	const sessionToken = req.get('Token');
	const deleteKeyResponse = deleteKey(sessionToken);

	if (deleteKeyResponse) {
		const successResponse = makeResponseObj(responseCodes.ok, 'User logged out.', null, {
			...success_response_obj,
		});

		return Promise.resolve(successResponse);
	}
	const error = makeResponseObj(
		responseCodes.badRequest,
		'Error occured. Retrying may help if error was unexpected.',
		{ message: 'Error occured. Try again!' },
		{ ...fail_response_obj },
	);

	res.status(error.code).json(error);
};

module.exports = {
	signinUser,
	verifySession,
	deleteSession,
};

const { makeResponseObj, storeToken } = require('../../helper/utils');
const { findOneAndSelect } = require('../../helper/mongoose');
const { fail_response_obj } = require('../../constants');

const verifyUserPassword = (obtainedPassword, email) => {
	const fetchUser = findOneAndSelect(
		{ email },
		{
			firstName: 1,
			lastName: 1,
			email: 1,
			password: 1,
		},
		'User',
	);

	return fetchUser
		.then((fetchUserResponse) => {
			if (fetchUserResponse.status && fetchUserResponse.data.password === obtainedPassword) {
				const response = { ...fetchUserResponse };
				delete response.data.password;
				return response;
			}
			return makeResponseObj(400, 'User not verified.', null, fail_response_obj);
		})
		.catch((error) => makeResponseObj(400, 'User not verified.', error, fail_response_obj));
};

const createUserSession = async ({ email, password, shouldRemember }) => {
	let verifyResponse;

	try {
		verifyResponse = await verifyUserPassword(password, email);
	} catch (error) {
		return error;
	}

	if (verifyResponse.status) {
		verifyResponse.data.shouldRemember = shouldRemember;

		const storeTokenPromise = storeToken(email, verifyResponse.data);

		return storeTokenPromise;
	}
	return verifyResponse;
};

module.exports = {
	createUserSession,
};

const { makeResponseObj, storeToken } = require('../../helper/utils');

const verifyUserPassword = (obtainedPassword, email) => {
	const fetchUser = mongooseHelper.findOneAndSelect(
		{ email },
		{
			firstName: 1, lastName: 1, email: 1, password: 1,
		},
		'User',
	);

	return fetchUser
		.then((fetchUserResponse) => {
			if (fetchUserResponse.status && fetchUserResponse.data.password === obtainedPassword) {
				delete fetchUserResponse.data.password;
				return fetchUserResponse;
			}
			return makeResponseObj(400, 'User not verified.', null, resources.fail_response_obj);
		})
		.catch((error) => makeResponseObj(400, 'User not verified.', error, resources.fail_response_obj));
};

const createUserSession = async ({ email, password, shouldRemember }) => {
	delete userCredentials.password;
	let verifyResponse;

	try {
		verifyResponse = await verifyUserPassword(password, email);
	} catch (error) {
		return error;
	}

	if (verifyResponse.status) {
		verifyResponse.data.shouldRemember = shouldRemember;

		const storeTokenPromise = storeToken(userCredentials.userName, verifyResponse.data);

		return storeTokenPromise;
	}
	return verifyResponse;
};

module.exports = {
	createUserSession,
};

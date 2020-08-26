const validator = require('./validator');
const redisHelper = require('./redis');
const jwtHelper = require('./jwt');
const {fail_response_obj, success_response_obj, login_success, failed_redis_session} = require('../constants');

const makeResponseObj = (code, message, data, sourceObj) => ({
	...sourceObj,
	code,
	message,
	...(code >= 200 && code < 300 ? { data } : {}),
	...(code >= 400 && code < 500 ? { error: data } : {}),
});

const fulfillPromise = (
	data,
	successCode,
	successMessage,
	successData,
	successObj,
	errorCode,
	errorMessage,
	errorData,
	errorObj,
) => {
	// let result = await promise;

	if (!validator.nullUndefinedValidate(data)) {
		return makeResponseObj(errorCode, errorMessage, errorData, errorObj);
	}

	const docSuccess = makeResponseObj(successCode, successMessage, data, successObj);

	return docSuccess;
};

const rejectPromise = (code, message, error) => Promise.reject(
	makeResponseObj(code, message, error, {
		...fail_response_obj,
	}),
);

const storeToken = (unsignedToken, redisValue) => {
	const token = jwtHelper.sign({ [unsignedToken]: redisValue });

	const redisResponse = redisHelper.setKeyForever(token, redisValue);

	if (redisResponse) {
		const session = {
			user: redisValue,
			token,
		};

		return makeResponseObj(200, login_success, session, {
			...success_response_obj,
		});
	}
	return rejectPromise(400, failed_redis_session);
};

const getTokenData = (token) => {
	const isTokenValid = jwtHelper.verify(token);

	if (!isTokenValid) {
		return rejectPromise(400, { ...fail_response_obj });
	}

	return redisHelper.getValue(token);
};

const parsePageQuery = (pageString) => (Number(pageString) ? Number(pageString) : 1);

const parsePageSizeQuery = (pageSizeString) => (Number(pageSizeString) ? Number(pageSizeString) : 1);

module.exports = {
	makeResponseObj,
	fulfillPromise,
	rejectPromise,
	storeToken,
	getTokenData,
	parsePageQuery,
	parsePageSizeQuery,
};

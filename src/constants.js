module.exports = {
	routes_prefix: '/api',

	success_response_obj: {
		message: '',
		code: 200,
		status: true,
		data: null,
	},

	fail_response_obj: {
		message: '',
		code: 400,
		status: false,
		error: null,
	},

	mongo_connect_success: 'Successfully Connected to MongoDB at ',
	mongo_connect_fail: 'Failed to connect to MongoDB at ',

	redis_connect_success: 'Successfully Connected to Redis server at ',
	redis_connect_fail: 'Failed to connect to Redis server at ',
	redis_monitor_mode_on: 'Redis monitor mode activated.',

	db_fetch_success: 'Found Successfully.',
	db_fetch_fail: 'Failed to Fetch.',

	failed_redis_session: 'Failed to create new session. Retry!',

	login_success: 'Successfully logged in.',

	// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
	responseCodes: {
		ok: 200,
		badRequest: 400,
		unAuthorized: 401,
		paymentRequired: 402,
		forbidden: 403,
		notFound: 404,
		requestTimeout: 408,
		internalServerError: 500,
		notImplemented: 501,
		serviceUnavailable: 503,
	},

	user_model_name: 'users',
	todo_model_name: 'todos',
	jwtEncryptionAlgo: 'RS256',
};

const { responseCodes } = require('../constants');
const { verifySessionToken } = require('../modules/session/controller');

const authenticate = async (req, res, next) => {
	const token = req.get('Token');

	if (token != null) {
		const tokenData = await verifySessionToken(token);

		if (tokenData.status) {
			req.context = {
				...req.context,
				user: tokenData.data,
			};

			next();
		} else {
			res.status(responseCodes.unAuthorized).send('Not authenticated');
		}
	} else {
		res.status(responseCodes.unAuthorized).send('Not authenticated.');
	}
};

module.exports = {
	authenticate,
};

const { objectArrayNullUndefinedValidate } = require('./validator');
const { rejectPromise, fulfillPromise } = require('./utils');
const { db_fetch_fail, db_fetch_success, success_response_obj, fail_response_obj } = require('../constants');

/**
 * Finds a single document and select specified fields
 *
 * @param {mongoose.Schema} collectionObj
 * @param {*} queryObj
 * @param {*} selectQuery
 * @param {string} collectionName
 */

const findOneAndSelect = async (collectionObj, queryObj, selectQuery, collectionName) => {
	if (!objectArrayNullUndefinedValidate([collectionObj, queryObj, selectQuery, collectionName], [collectionName])) {
		return rejectPromise(400, db_fetch_fail);
	}

	const fetchDocument = await collectionObj.findOne(queryObj, selectQuery).lean();

	const promise = fulfillPromise(
		fetchDocument,
		200,
		collectionName + db_fetch_success,
		null,
		{ ...success_response_obj },
		400,
		db_fetch_fail,
		null,
		{ ...fail_response_obj }
	);

	return promise;
};

module.exports = {
	findOneAndSelect,
};

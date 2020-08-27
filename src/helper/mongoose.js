const { ObjectId } = require('mongodb');

const { objectArrayNullUndefinedValidate, mongodbObjectIdValidate } = require('./validator');
const { rejectPromise, fulfillPromise } = require('./utils');
const {
	db_fetch_fail,
	db_fetch_success,
	success_response_obj,
	fail_response_obj,
	mongodb_invalid_id,
	DB_INSERT_SUCCESS,
	DB_INSERT_FAIL,
} = require('../constants');

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
		{ ...fail_response_obj },
	);

	return promise;
};

/**
 * Finds multiple documents and select specified fields of queried documents
 *
 * @param {mongoose.Schema} collectionObj
 * @param {*} queryObj
 * @param {*} selectQuery
 * @param {string} collectionName
 */
const findBulkAndSelect = async (collectionObj, queryObj, selectQuery, collectionName) => {
	if (!objectArrayNullUndefinedValidate([collectionObj, queryObj, selectQuery, collectionName], [collectionName])) {
		return rejectPromise(400, mongodb_invalid_id);
	}

	const fetchDocument = await collectionObj.find(queryObj, selectQuery).lean();

	const promise = fulfillPromise(
		fetchDocument,
		200,
		collectionName + db_fetch_success,
		null,
		{ ...success_response_obj },
		400,
		db_fetch_fail,
		null,
		{ ...fail_response_obj },
	);

	return promise;
};

/**
 * Inserts a new document
 *
 * @param {*} newObj
 * @param {string} collectionName
 */
const insertDocument = async (newObj, collectionName) => {
	if (!objectArrayNullUndefinedValidate([newObj, collectionName], [collectionName])) {
		return rejectPromise(400, mongodb_invalid_id);
	}

	const insertResponse = await newObj.save();

	const promise = fulfillPromise(
		insertResponse,
		200,
		`${collectionName} ${DB_INSERT_SUCCESS}`,
		null,
		{ ...success_response_obj },
		400,
		DB_INSERT_FAIL,
		null,
		{ ...fail_response_obj },
	);

	return promise;
};

/**
 * Updates a document
 *
 * @param {mongoose.Schema} collectionObj
 * @param {*} queryObj
 * @param {*} updateFieldsObj
 * @param {string} collectionName
 */
const updateDocument = async (collectionObj, queryObj, updateFieldsObj, collectionName) => {
	if (
		!objectArrayNullUndefinedValidate([collectionObj, queryObj, updateFieldsObj, collectionName], [collectionName])
	) {
		return rejectPromise(400, mongodb_invalid_id);
	}

	const updateResponse = await collectionObj.updateMany(
		queryObj,
		{ $set: updateFieldsObj },
		{ new: true, multi: true },
	);

	const promise = fulfillPromise(
		updateResponse,
		200,
		collectionName + db_fetch_success,
		null,
		{ ...success_response_obj },
		400,
		db_fetch_fail,
		null,
		{ ...fail_response_obj },
	);

	return promise;
};

/**
 * Finds document by mongodb Id and update
 *
 * @param {mongoose.Schema} collectionObj
 * @param {string} idString
 * @param {*} queryObj
 * @param {*} updateFieldsObj
 * @param {string} collectionName
 */
const updateDocumentById = async (collectionObj, idString, queryObj, updateFieldsObj, collectionName) => {
	if (!mongodbObjectIdValidate(idString)) {
		return rejectPromise(400, mongodb_invalid_id);
	}

	queryObj._id = ObjectId(idString);

	const updateDocumentPromise = await updateDocument(collectionObj, queryObj, updateFieldsObj, collectionName);

	return updateDocumentPromise;
};

/**
 * Deletes documents
 *
 * @param {mongoose.Schema} collectionObj
 * @param {*} queryObj
 * @param {string} collectionName
 */
const deleteDocument = async (collectionObj, queryObj, collectionName) => {
	if (!objectArrayNullUndefinedValidate([collectionObj, queryObj, collectionName], [collectionName])) {
		return rejectPromise(400, mongodb_invalid_id);
	}

	const deleteResponse = await collectionObj.deleteMany(queryObj);

	const promise = fulfillPromise(
		deleteResponse,
		200,
		collectionName + db_fetch_success,
		null,
		{ ...success_response_obj },
		400,
		db_fetch_fail,
		null,
		{ ...fail_response_obj },
	);

	return promise;
};

/**
 * Deletes documents by Id
 *
 * @param {mongoose.Schema} collectionObj
 * @param {string} idString
 * @param {string} collectionName
 */
const deleteDocumentById = async (collectionObj, idString, collectionName) => {
	if (!mongodbObjectIdValidate(idString)) {
		return rejectPromise(400, mongodb_invalid_id);
	}

	const deleteDocumentPromise = await deleteDocument(collectionObj, { _id: ObjectId(idString) }, collectionName);

	return deleteDocumentPromise;
};

module.exports = {
	findOneAndSelect,
	findBulkAndSelect,
	insertDocument,
	updateDocumentById,
	deleteDocumentById,
};

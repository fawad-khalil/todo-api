const { ObjectId } = require('mongodb');

const mongodbObjectIdValidate = (id) => !!(ObjectId.isValid(id));

const mongodbObjectIdArrayValidate = (ids) => !ids.map((id) => mongodbObjectIdValidate(id)).includes(false);

const nullUndefinedValidate = (variable) => !!((variable != null && variable != undefined));

const nullUndefinedValidateVariablesArray = (variables) => {
	for (const elem in variables) {
		if (!nullUndefinedValidate(elem)) {
			return false;
		}
	}

	return true;
};

const emptyStringValidate = (variable) => variable != '';

const emptyStringValidateVariablesArray = (variables) => {
	for (const elem in variables) {
		if (!emptyStringValidate(elem)) {
			return false;
		}
	}

	return true;
};

const nullValidate = (variable) => variable != null;

const undefinedValidate = (variable) => variable != undefined;

const successStatusValidate = (variable) => !!variable.status;

const objectArrayNullUndefinedValidate = (nullUndefinedValidateCandidates, emptyStringValidateCandidates) => {
	if (!nullUndefinedValidateVariablesArray(nullUndefinedValidateCandidates)) {
		return false;
	}

	if (!emptyStringValidateVariablesArray(emptyStringValidateCandidates)) {
		return false;
	}

	return true;
};

module.exports = {
	nullUndefinedValidate,
	emptyStringValidate,
	nullValidate,
	undefinedValidate,
	successStatusValidate,
	objectArrayNullUndefinedValidate,
	mongodbObjectIdValidate,
	mongodbObjectIdArrayValidate,

};

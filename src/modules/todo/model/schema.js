const mongoose = require('mongoose');
const UserSchema = require('../../user/model/schema');

const { Schema } = mongoose;
const userSchema = new Schema(
	{
		user: {
			type: UserSchema,
		},

		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = userSchema;

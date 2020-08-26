const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema(
	{
		email: {
			type: String,
		},

		password: String,

		firstName: {
			type: String,
		},

		lastName: String,
	},
	{
		timestamps: true,
	},
);

module.exports = userSchema;

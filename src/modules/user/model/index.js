const mongoose = require('mongoose');
const userSchema = require('./schema');
const { user_model_name } = require('../../../constants');

const User = mongoose.model(user_model_name, userSchema);

module.exports = User;

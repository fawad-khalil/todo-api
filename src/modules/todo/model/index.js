const mongoose = require('mongoose');
const schema = require('./schema');
const { todo_model_name } = require('../../../constants');

const ToDO = mongoose.model(todo_model_name, schema);

module.exports = ToDO;

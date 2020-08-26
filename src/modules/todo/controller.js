const Todo = require('./model');
const { insertDocument, updateDocumentById, findBulkAndSelect, deleteDocumentById } = require('../../helper/mongoose');
const { responseCodes, internal_server_error } = require('../../constants');

const addTodo = async (req, res) => {
	const { todo } = req.body;

	const todoDoc = new Todo(todo);

	try {
		const insertResponse = await insertDocument(todoDoc, 'Todo');

		res.status(insertResponse.code).json(insertResponse);
	} catch (error) {
		res.status(responseCodes.internalServerError).json({ message: internal_server_error, error });
	}
};

const updateTodo = async (req, res) => {
	const { todoId } = req.param;
	const { todo } = req.body;

	try {
		const updateResponse = await updateDocumentById(Todo, todoId, {}, todo, 'Todo');

		res.status(updateResponse.code).json(updateResponse);
	} catch (error) {
		res.status(responseCodes.internalServerError).json({ message: internal_server_error, error });
	}
};

const getTodo = async (req, res) => {
	const { _id } = req.context;

	try {
		const getResponse = await findBulkAndSelect(Todo, { 'user._id': _id }, { user: 0 }, 'Todo');

		res.status(getResponse.code).json(getResponse);
	} catch (error) {
		res.status(responseCodes.internalServerError).json({ message: internal_server_error, error });
	}
};

const deleteTodo = async (req, res) => {
	const { id } = req.param;

	try {
		const deleteResponse = await deleteDocumentById(Todo, id, 'Todo');

		res.status(deleteResponse.code).json(deleteResponse);
	} catch (error) {
		res.status(responseCodes.internalServerError).json({ message: internal_server_error, error });
	}
};

module.exports = {
	addTodo,
	updateTodo,
	getTodo,
	deleteTodo,
};

/* npm modules */
const express = require('express');

/* local product packages */
const {
	addTodo, updateTodo, getTodo, deleteTodo,
} = require('./controller');
const { authenticate } = require('../../middleware');

/* data variables */
const router = express.Router();

/** Gets Todo */
router.get('/', authenticate, getTodo);
/** Adds Todo */
router.post('/', authenticate, addTodo);
/** Updates Todo */
router.put('/:todoId', authenticate, updateTodo);
/** Removes Todo */
router.delete('/:todoId', authenticate, deleteTodo);

module.exports = { router, prefix: '/todos' };

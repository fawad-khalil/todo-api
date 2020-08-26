const sessionRouter = require('./modules/session/routes');
const userRouter = require('./modules/user/routes');
const todoRouter = require('./modules/todo/routes');

module.exports = {
	sessionRouter,
	userRouter,
	todoRouter,
};

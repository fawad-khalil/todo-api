const colors = require('colors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes');

// connect to mongodb
require('./libs/MoongooseConnection');
// connect to redis
require('./libs/RedisConnection');

colors.setTheme({
	info: 'blue',
	warn: 'yellow',
	alert: 'red',
	silly: 'rainbow',
	verbose: 'cyan',
	success: 'green',
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Token');
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.options((_req, res) => {
	res.sendStatus(200);
});

for (const key in routes) {
	const currentRoute = routes[key];
	/* eslint-disable-next-line */
	console.log(`${key} ${const_resources.routes_prefix}${currentRoute.prefix}`.info);
	app.use(const_resources.routes_prefix + currentRoute.prefix, currentRoute.route);
}

// catch 404 and forward to error handler
app.use((_req, res) => {
	res.status(const_resources.responseCodes.notFound).send('Path not found.');
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

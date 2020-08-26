const mongoose = require('mongoose');
const { MONGO_SERVER, MONGO_DB } = require('../config');
const { mongo_connect_success, mongo_connect_fail } = require('../constants');

// connect to mongoose
const dbLink = MONGO_SERVER + MONGO_DB;
const mongoConnect = mongoose.connect(dbLink, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	keepAlive: true,
});
mongoose.set('useCreateIndex', true);

mongoConnect
	.then(() => {
		/* eslint-disable-next-line */
		console.log(`${mongo_connect_success}${dbLink}!`.success);
	})
	.catch((error) => {
		/* eslint-disable-next-line */
		console.log(`${mongo_connect_fail}${dbLink}!`.alert, error.verbose);
	});

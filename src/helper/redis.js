const redisClient = require('../libs/RedisConnection');

const setKeyForever = (key, value) => {
	let valueForRedis = value;
	if (typeof value !== String) {
		valueForRedis = JSON.stringify(value);
	}

	return redisClient.set(key, valueForRedis);
};

const setKeyMortal = (key, value, lifeInSeconds) => redisClient.set(key, value, 'EX', lifeInSeconds);

const getValue = (key) => {
	const promise = new Promise((resolve, reject) => {
		redisClient.get(key, (error, reply) => {
			if (error) {
				reject(error);
			}

			resolve(JSON.parse(reply));
		});
	});

	return promise;
};

const deleteKey = (key) => redisClient.del(key);

module.exports = {
	setKeyForever,
	setKeyMortal,
	getValue,
	deleteKey,
};

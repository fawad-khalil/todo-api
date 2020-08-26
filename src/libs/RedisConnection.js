const redis = require('redis');
const { REDIS_SERVER, REDIS_PORT } = require('../config');
const { redis_connect_success, redis_connect_fail, redis_monitor_mode_on } = require('../constants');

const redisClient = redis.createClient(REDIS_PORT, REDIS_SERVER);

redisClient.monitor(() => {
	/* eslint-disable-next-line */
	console.log(redis_monitor_mode_on.success);
});

redisClient.on('connect', () => {
	/* eslint-disable-next-line */
	console.log((redis_connect_success + REDIS_SERVER + ':' + REDIS_PORT).success);
});

redisClient.on('error', (error) => {
	/* eslint-disable-next-line */
	console.log((redis_connect_fail + REDIS_SERVER + ':' + REDIS_PORT).alert, error.verbose);
});

redisClient.on('monitor', (time, args) => {
	/* eslint-disable-next-line */
	console.log('Request to redis: ' + time + ': ' + args); // Request to redis: 1458910076.446514:['set', 'foo', 'bar']
});

module.exports = redisClient;

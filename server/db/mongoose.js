var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
	useMongoClient: true,
});

module.exports = { mongoose };

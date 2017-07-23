// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		console.log(err);
		return console.log('Unable to connect to mongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').insertOne({
	// 	text: 'something to do',
	// 	completed: false,
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('unable to insert todo', err);
	// 	}
	//
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	//
	// });

	// db.collection('Users').insertOne({
	// 	name: 'Eli',
	// 	age: 21,
	// 	location: 'Fort Wayne',
	// }, (err, result) => {
	// 	if (err) {
	// 		console.log('unable to insert', err);
	// 	}
	//
	// 	console.log(result.ops[0]._id.getTimestamp());
	//
	// });

	db.close();
});

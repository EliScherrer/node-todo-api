// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		console.log(err);
		return console.log('Unable to connect to mongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').findOneAndUpdate(
	// 	{_id: new ObjectID("5974ea40227eaad484f387b3")},
	// 	{ $set: { completed: true } },
	// 	{ returnOriginal: false }
	// ).then((result) => {
	// 	console.log(result);
	// 	db.close();
	// });

	db.collection('Users').findOneAndUpdate(
		{ _id: new ObjectID("5973e067dbaac2a2e0655847") },
		{ $set: { name: 'Eli' }, $inc: { age: 1 } },
		{ returnOriginal: false }
	).then((result) => {
		console.log(result);
		db.close();
	})

	// db.close();
});

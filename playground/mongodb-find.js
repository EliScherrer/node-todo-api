// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		console.log(err);
		return console.log('Unable to connect to mongoDB server');
	}
	console.log('Connected to MongoDB server');

	// db.collection('Todos').find({ _id: new ObjectID('5973df6782c232a2d4642b21') }).toArray()
	// 	.then((docs) => {
	// 		console.log('Todos');
	// 		console.log(docs);
	// 		db.close();
	// 	}, (err) => {
	// 		console.log('unable to fetch todos', err);
	// 	});

	// db.collection('Todos').find().count()
	// 	.then((count) => {
	// 		console.log(`Todos count: ${count}`);
	// 		db.close();
	// 	}, (err) => {
	// 		console.log('unable to fetch todos', err);
	// 	});

	db.collection('Users').find({name: 'Mike'}).toArray()
		.then((docs) => {
			console.log('Todos');
			console.log(docs);
			db.close();
		}, (err) => {
			console.log('unable to fetch todos', err);
		});


	// db.close();
});

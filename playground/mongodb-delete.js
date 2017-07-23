// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		console.log(err);
		return console.log('Unable to connect to mongoDB server');
	}
	console.log('Connected to MongoDB server');

	//delete many
	// db.collection('Users').deleteMany({name: 'Eli'})
	// 	.then((result) => {
	// 		console.log(result);
	// 	});

	//delete one
	// db.collection('Todos').deleteOne({text: 'eat food'})
	// 	.then((result) => {
	// 		console.log(result);
	// 		db.close();
	// 	});

	//find one and delete
	// db.collection('Users').findOneAndDelete({_id: ObjectId("5973e067dbaac2a2e0655847")})
	// 	.then((result) => {
	// 		console.log(result);
	// 	})


	// db.close();
});

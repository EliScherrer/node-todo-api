const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user')


//ObjectId("5977d8526083a30a06dd4c36")
//5977fe6c9aeed60f030f1c4e

var id = '5977d8526083a30a06dd4c361';

// if (!ObjectID.isValid(id)) {
// 	return console.log('ID not valid');
// }

// Todo.find({ _id: id })
// 	.then((todos) => {
// 		if(todos.length === 0) {
// 			return console.log('no entries with that id exist');
// 		}
// 		console.log('Todos', todos);
// 	});
//
// Todo.findOne({ _id: id })
// 	.then((todo) => {
// 		console.log('Todo', todo);
// 	});

// Todo.findById(id)
// 	.then((todo) => {
// 		if (!todo) {
// 			return console.log('Id not found');
// 		}
// 		console.log('Todo', todo);
// 	}).catch((err) => {
// 		console.log(err);
// 	})

//query users collection
	//user.findById
		//handle 3 cases
			//user was found
			//user wasn't found
			//error thrown
User.findById(id)
	.then((user) => {
		if (!user) {
			return console.log('that user does not exist');
		}
		console.log('User: ', user);
	}).catch((err) => {
		console.log('that didnt work please inspect the following error message', err);
	})

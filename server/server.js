var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {
	useMongoClient: true,
});

var Todo = mongoose.model('Todo', {
	text: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
});

var newTodo = new Todo({
	text: 'J O',
	completed: false,
	completedAt: 123,
});

newTodo.save().then((doc) => {
	console.log(JSON.stringify(doc, undefined, 2));
	mongoose.connection.close();
}, (e) => {
	console.log('unable to save todo');
});

var mongoose = require('mongoose');

var Todo = mongoose.model('todos', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	completedAt: {
		type: Number,
		default: null
	}
});

//
// var newTodo = new Todo({
// 	text: 'J O',
// 	completed: false,
// 	completedAt: 123,
// });


module.exports = { Todo };
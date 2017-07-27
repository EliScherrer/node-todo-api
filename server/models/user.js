const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('users', {
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value);
			},
			message: `{VALUE} is not a valid email`
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	tokens: [{
		access: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		}
	}]
})

// var newUser = new User({
// 	email: 'escherre@purdue.edu',
// });

module.exports = { User };

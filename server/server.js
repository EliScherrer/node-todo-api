const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { ObjectID } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text,
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});

});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({ todos });
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		res.status(404).send();
		return;
	}

	Todo.findById(id)
		.then((todo) => {
			if(todo) {
				res.status(200).send({todo});
				return;
			}
			res.status(404).send();

		}).catch((err) => {
			res.status(400).send();
		})
});

app.delete('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		res.status(404).send();
		return;
	}

	Todo.findByIdAndRemove(id)
		.then((todo) => {
			if (todo) {
				return res.status(200).send({todo});
			}
			else {
				return res.status(404).send();
			}
		})
		.catch((err) => {
			res.status(400).send();
		})
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if(!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	}
	else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id,
		{ $set: body },
		{ new: true }
	).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		else {
			return res.send({ todo });
		}

	}).catch((err) => {
		res.status(400).send();
	})

});


app.listen(port, () => {
	console.log(`Started on port: ${port}`);
})

module.exports = { app };

// newUser.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 2));
// 	mongoose.connection.close();
// }, (e) => {
// 	console.log('unable to save todo');
// 	mongoose.connection.close();
// });

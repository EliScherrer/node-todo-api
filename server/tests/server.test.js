const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	it('should create a new todo', (done) => {

		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({ text })
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find({ text }).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => {	return done(e); })
			});
	});

	it('should not create todo with invalid body data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch ((e) => done(e));
			})
	});
});

describe('Get /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('Get /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});
	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`/todos/6977fe6c9aeed60f030f1c4f`)
			.expect(404)
			.end(done);
	});


	it('should return 404 for non-object ids', (done) => {
			request(app)
				.get('/todos/123')
				.expect(404)
				.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo', (done) => {
		var id = todos[1]._id.toHexString();
		request(app)
			.delete(`/todos/${id}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(id);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.findById(id)
					.then((todo) => {
						expect(todo).toNotExist();
						done();
					}).catch((err) => done(err));
			});
	});

	it('should return 404 if todo not found', (done) => {
		request(app)
			.delete(`/todos/7977fe6c9aeed60f030f1c4f`)
			.expect(404)
			.end(done);
	});

	it('should return 404 if id is invalid', (done) => {
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () => {
	it('should update the todo', (done) => {
		var id = todos[0]._id.toHexString();
		var text = "this should be the new text";

		request(app)
			.patch(`/todos/${id}`)
			.send({
				completed: true,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completedAt).toBeA('number');
			})
			.end(done);

	});

	it('should clear completedAt when todo is not completed', (done) => {
		var id = todos[1]._id.toHexString();
		var text = "this should be the new text2"

		request(app)
			.patch(`/todos/${id}`)
			.send({
				completed: false,
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completedAt).toNotExist();
			})
			.end(done);
	});
});

describe('Get /users/me', () => {
	it('should return user if authenticated', (done) => {
		request(app)
			.get('/users/me')
			.set('x-auth', users[0].tokens[0].token)
			.expect(200)
			.expect((res) => {
				expect(res.body._id).toBe(users[0]._id.toHexString());
				expect(res.body.email).toBe(users[0].email);
			})
			.end(done);
	});

	//call route
	//don't use x-auth
	//expect 401
	//expect body is empty object (toEqual)
	//call end
	it('should return a 401 if not authenticated', (done) => {
		request(app)
			.get('/users/me')
			.expect(401)
			.expect((res) => {
				expect(res.body).toEqual({});
			})
			.end(done);
	});
});

describe('POST /users', () => {
	it('should create a user', (done) => {
		var email = 'example@example.com';
		var password = '123mnb!';

		request(app)
			.post('/users')
			.send({email, password: password})
			.expect(200)
			.expect((res) => {
				expect(res.headers['x-auth']).toExist();
				expect(res.body._id).toExist();
				expect(res.body.email).toBe(email);
			})
			.end((err) => {
				if (err) {
					return done(err);
				}

				User.findOne({email}).then((user) => {
					expect(user).toExist();
					expect(user.password).toNotBe(password);
					done();
				});
			});
	});

	//send invalid email and password
	//expect 400
	it('should return validation errors if request invalid', (done) => {
		request(app)
			.post('/users')
			.send({
				email: 'dis is an email?',
				password: '12'
			})
			.expect(400)
			.end(done);
	});

	//use an email created in seed data
	//expect 400
	it('should not create user if email in use', (done) => {
		request(app)
			.post('/users')
			.send({email: users[0].email, password: '123abcd'})
			.expect(400)
			.end(done);
	});
});

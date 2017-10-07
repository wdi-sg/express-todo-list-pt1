const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')

mongoose.connect('mongodb://localhost/todo-list', {
  useMongoClient: true
})
mongoose.Promise = global.Promise

// TODO. include express and body-parser, plugin in the todos controller and start listening

// TODO. link each CRUD routes with controllers methods from `todos_controller.js`
// e.g. app.get('/todos', todosController.list)

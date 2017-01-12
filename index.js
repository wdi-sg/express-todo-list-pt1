const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')

mongoose.connect('mongodb://localhost/todo-list')
mongoose.Promise = global.Promise

// example create call
todosController.create({
  name: 'first todo',
  description: 'my first todo',
  completed: false
})

// example list call
todosController.list()

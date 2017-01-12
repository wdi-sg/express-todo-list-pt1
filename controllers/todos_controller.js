const Todo = require('../models/todo')

function create (params) {
  Todo.create(params, function (err, todo) {
    if (err) {
      console.log(err)
      return
    }
    console.log(todo)
  })
}

function list () {
  Todo.find({}, function (err, todos) {
    if (err) {
      console.log(err)
      return
    }
    console.log(todos)
  })
}

function show (id) {
  Todo.findById(id, function (err, todo) {
    if (err) return console.log(err)
    console.log(todo)
  })
}

function update (id, params) {
  Todo.findOneAndUpdate({ _id: id }, params, function (err, todo) {
    if (err) console.log(err)
    console.log(todo)
  })
}

function destroy (id) {
  Todo.findOneAndRemove({ _id: id }, function (err) {
    if (err) console.log(err)
    console.log('User deleted!')
  })
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
}

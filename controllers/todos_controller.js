const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
})

// index
router.get('/todos', function (req, res) {
  Todo.find({}, function (err, data) {
    if (err) console.error(err)
    res.render('todos', {todoList: data})
  })
})

// create
router.get('/todos/new', function (req, res) {
  res.render('new')
})

router.post('/todos', function (req, res) {
  var newTodo = Todo()
  console.log(req.body)
  newTodo.name = req.body.name
  newTodo.description = req.body.description || ''
  newTodo.completed = false

  console.log('created' + newTodo)
  Todo.create(newTodo, function (err, data) {
    if (err) console.error(err)
    console.log('saved')
    res.redirect('/todos/' + data.id)
  })
})

// update/show
router.post('/showAndUpdateTodo', function (req, res) {
  res.redirect('/todos/' + req.body.id)
})

router.get('/todos/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, data) {
    if (err) console.error(err)
    console.log(data)
    res.render('update', {updateTodo: data})
  })
})

router.post('/todoUpdated', function (req, res) {
  Todo.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, todo) {
    if (err) console.error(err)
    console.log('updated' + todo)
  })
  res.redirect('/todos')
})

router.post('/completeTodo', function (req, res) {
  console.log(req.body.id)
  Todo.findOneAndUpdate({ _id: req.body.id }, { $set: { completed: true } }, function (err, todo) {
    if (err) console.error(err)
    console.log('updated' + todo)
  })
  // res.redirect('/todos')
})

// remove
router.post('/deleteTodo', function (req, res) {
  Todo.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) console.error(err)
    console.log('Todo deleted!')
  })
  res.redirect('/')
})

module.exports = router

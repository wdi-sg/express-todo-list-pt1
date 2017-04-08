const Todo = require('../models/todo')
const express = require('express')
const app = express()
const router = express.Router()

const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/todos'
mongoose.Promise = global.Promise

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

// create
router.post('/todos', function (req, res) {
  // console.log(req.body)
  var newTodo = Todo()

  newTodo.name = req.body.name
  newTodo.description = req.body.description || ''
  newTodo.completed = false

  console.log('created' + newTodo)
  if (!mongoose.connection.db) mongoose.connect(dbURI)
  newTodo.save(function (err) {
    if (err) console.error(err)
    console.log('saved')
    res.send(newTodo)
    mongoose.disconnect()``
  })
  // res.redirect('/')
})

// index
router.get('/todos', function (req, res) {
  mongoose.connect(dbURI)
  Todo.find({}, function (err, data) {
    if (err) console.error(err)
    mongoose.disconnect()
    res.render('slashtodos', {todoList: data})
  })
})

// update/show
router.post('/showUpdate', function (req, res) {
  res.redirect('/todos/' + req.body.id)
})

router.get('/todos/:id', function (req, res) {
  mongoose.connect(dbURI)
  Todo.findById(req.params.id, function (err, data) {
    if (err) console.error(err)
    console.log(data)
    mongoose.disconnect()
    res.render('update', {updateTodo: data})
  })
})

router.post('/todoUpdated', function (req, res) {
  if (!mongoose.connection.db) mongoose.connect(dbURI)
  Todo.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, todo) {
    if (err) console.error(err)
    console.log('updated' + todo)
    mongoose.disconnect()
  })
  res.redirect('/')
})

// remove
router.post('/removeTodo', function (req, res) {
  if (!mongoose.connection.db) mongoose.connect(dbURI)
  Todo.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) console.error(err)
    console.log('Todo deleted!')
    mongoose.disconnect()
  })
  res.redirect('/')
})

module.exports = router

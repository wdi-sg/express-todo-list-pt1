const Todo = require('../models/todo')
const express = require('express')
const app = express()
const router = express.Router()

const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/test'

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

// create
router.post('/', function (req, res) {
  var newTodo = Todo()

  newTodo.name = req.body.name
  newTodo.description = req.body.description || ''
  newTodo.completed = req.body.completed || false

  console.log(newTodo)
  if (!mongoose.connection.db) mongoose.connect(dbURI)
  newTodo.save(function (err) {
    if (err) console.error(err)
    console.log('saved')
    mongoose.disconnect()
  })
})

// index
router.get('/', function (req, res) {
  if (!mongoose.connection.db) mongoose.connect(dbURI)
  Todo.find({}, function (err, data) {
    if (err) console.error(err)
    res.render('index', {todoList: data})
    mongoose.disconnect()
  })
})

// show
router.get('/show/:id', function (req, res) {
  if (!mongoose.connection.db) mongoose.connect(dbURI)
  Todo.findById(req.params.id, function (err, data) {
    if (err) console.error(err)
    res.render('show', {todo: data})
    mongoose.disconnect()
  })
})

// update
router.post('/showUpdate', function (req, res) {
  res.redirect('/update/' + req.body.id)
})

router.get('/update/:id', function (req, res) {
  if (!mongoose.connection.db) mongoose.connect(dbURI)
  Todo.findById(req.params.id, function (err, data) {
    if (err) console.error(err)
    console.log(data)
    res.render('update', {updateTodo: data})
    mongoose.disconnect()
  })
})

router.post('/todoUpdated', function (req, res) {
  if (!mongoose.connection.db) mongoose.connect(dbURI)
  Todo.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, todo) {
    if (err) console.error(err)
    console.log(todo)
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

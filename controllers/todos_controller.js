const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index')
})

// todos routes
router.route('/todos')
.get(function (req, res) {
  Todo.find({}, function (err, data) {
    if (err) {
      console.error(err)
      res.render('index')
      return
    }
    var completed = data.filter(function (item) { return item.completed === true })
    var notCompleted = data.filter(function (item) { return item.completed === false })
    res.render('todos', {todoCompleted: completed, todoNotCompleted: notCompleted})
  })
})
.post(function (req, res) {
  var newTodo = Todo()
  newTodo.name = req.body.name
  newTodo.description = req.body.description || ''
  newTodo.completed = false
  Todo.create(newTodo, function (err, data) {
    if (err) {
      console.error(err)
      res.render('index')
      return
    }
    res.redirect('/todos/' + data.id)
  })
})
.delete(function (req, res) {
  Todo.findOneAndRemove({ _id: req.body.id }, function (err) {
    if (err) {
      console.error(err)
      res.render('index')
      return
    }
  })
  res.redirect('/todos')
})

// form routes
router.get('/todos/new', function (req, res) {
  res.render('new')
})

router.get('/todos/:id/edit', function (req, res) {
  Todo.findById(req.params.id, function (err, data) {
    if (err) {
      console.error(err)
      res.render('index')
      return
    }
    res.render('update', {updateTodo: data})
  })
})

// show
router.route('/todos/:id')
.get(function (req, res) {
  Todo.findById(req.params.id, function (err, data) {
    if (err) {
      console.error(err)
      res.render('index')
      return
    }
    res.render('show', {showTodo: data})
  })
})
.put(function (req, res) {
  console.log(req.body)
  Todo.findOneAndUpdate({ _id: req.body.id }, req.body, function (err, todo) {
    if (err) {
      console.error(err)
      res.render('index')
      return
    }
    res.redirect('/todos/' + req.body.id)
  })
})

module.exports = router

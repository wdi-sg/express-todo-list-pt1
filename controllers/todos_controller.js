const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Todo = require('../models/todo')
const router = express.Router()
// TODO. import express and create a Router, replace the methods below with routes e.g.
// router.post('/', function(req,res) => {
//  Todo.create(req.body, function (err, todo) {
//    res.json(todo)
//  }
// })

router.get('/', function (req, res) {
  Todo.find({
    completed: false
  }, function (err, todos) {
    if (err) throw err
    // console.log(todos)
    res.render('homepage', {
      allTodos: todos
    })
  })
})

router.post('/create', function (req, res) {
  // console.log(req.body);
  var newtodo = new Todo(req.body)
  newtodo.save(function (err, data) {
    if (err) throw err
    // console.log(data)
    // console.log(data._id);
    Todo.find({
      _id: data.id
    }, function (err, todos) {
      if (err) throw err
      res.render('homepage', {
        allTodos: todos
      })
    })
  })
})

router.get('/listall', function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) throw err
    res.render('homepage', {
      allTodos: todos
    })
  })
})

router.post('/findid', function (req, res) {
  var id = req.body.idSearch
  Todo.find({
    _id: id
  }, function (err, todos) {
    if (err) return console.log(err)
    res.render('homepage', {
      allTodos: todos
    })
  })
})

router.post('/update', function (req, res) {
  // console.log(req.body)
  Todo.find({
    _id: req.body.idSearch
  }, function (err, data) {
    if (err) throw err
    data[0].name = req.body.name
    data[0].description = req.body.description
    data[0].completed = req.body.completed
    data[0].save()
    //  console.log(data)
    res.render('homepage', {
      allTodos: data
    })
  })
})

router.post('/remove', function (req, res) {
  // console.log(req.body)
  Todo.findOneAndRemove({_id: req.body.remove}, function(err, data){
    // console.log(data)
  })
  res.redirect('/')
})


module.exports = router

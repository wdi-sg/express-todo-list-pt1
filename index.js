const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/todo-list'
const port = 4000
const todosController = require('./controllers/todos_controller')
const express = require('express')
// console.log(express)
const app = express()
// console.log(app) an object with various functions
const Todo = require('./models/todo')
mongoose.Promise = global.Promise

// installed ovrride method for deleting post
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// to server js css file images in a folder named public which i might create with an absolute path string
var path = require('path')
// console.log(path)
app.use('/static', express.static(path.join(__dirname, 'public')))

// TODO. include express and body-parser, plugin in the todos controller and start listening
// this is where your route start
app.set('view engine', 'ejs')

// setting the layout structure
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)

// handle the post request
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))

if (!mongoose.connection.db) mongoose.connect(dbURI)

app.use('/', todosController)

app.listen(port, function () {
  console.log('connected to port: ' + port)
})

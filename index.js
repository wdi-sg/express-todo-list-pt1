const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')
var methodOverride = require('method-override')

// TODO. include express and body-parser, plugin in the todos controller and start listening
var express = require('express')
const path = require('path');
var app = express()
var port = 3000
// connect to db
var dbURI = 'mongodb://localhost/todo_list'
mongoose.connect(dbURI, function (err) {
  if (err) { console.error(err) }
  console.log('connected to db')
})
mongoose.Promise = global.Promise

// require the models
var Todo = require('./models/todo')
// console.log(mongoose)

// setting my template engine for express
app.set('view engine', 'ejs')

// setting the layout structure
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

// handle the post request
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

// route starts
app.use('/', todosController)
// add post request for forms
app.post('/', function (req, res) {
  // console.log(req.body)
  res.send(req.body)
})

app.listen(port, function () {
  console.log('express is running on port ' + port)
})

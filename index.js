const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')
const dbURI = 'mongodb://localhost/todo-list'
mongoose.Promise = global.Promise

const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', todosController)

app.listen(port, function () {
  console.log('listening on ' + port)
})

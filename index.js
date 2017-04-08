const express = require('express')
const app = express()
const port = 4000

// connect to db
const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/todos'
mongoose.Promise = global.Promise

// require the controller
const todosController = require('./controllers/todos_controller')
const slashTodos = require('./controllers/slashtodos')

// setting the layout
app.set('view engine', 'ejs')
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public'))

// handle the post request
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

if (!mongoose.connection.db) mongoose.connect(dbURI)

app.use('/', todosController)
app.use('/todos', slashTodos)

app.listen(port, function () {
  console.log('listening on ' + port)
})

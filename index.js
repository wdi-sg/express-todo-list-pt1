const express = require('express')
const app = express()
const port = 4000
const path = require('path')

// connect to db
const mongoose = require('mongoose')
const dbURI = 'mongodb://localhost/todos'
mongoose.Promise = global.Promise

// require the controller
const todosController = require('./controllers/todos_controller')

// setting the layout
app.set('view engine', 'ejs')
const ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)
app.use(express.static(path.join(__dirname, '/public')))

// handle the post request
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

if (!mongoose.connection.db) mongoose.connect(dbURI)

app.use('/', todosController)

app.listen(port, function () {
  console.log('listening on ' + port)
})

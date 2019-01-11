// se importan los middlewares
const express = require('express')
const bodyParser = require('body-parser')
// se instancia el middleware express en la constante app
const app = express()
// importa las rutas para navegar con las solicitudes Rest
const api = require('./routes')


app.use(bodyParser.urlencoded({extended : false}))
//Admitir peticiones con cuerpo en formato JSON
app.use(bodyParser.json())

app.use('/api', api)

module.exports = app
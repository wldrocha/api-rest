// Se importa mongoose para la bd
const mongoose = require('mongoose')
// Se importan las configuraciones
const config = require('./config')
// se importan los middlewares
const express = require('express')
const cors = require('cors')

// se instancia el middleware express en la constante app
const app = express()
// importa las rutas para navegar con las solicitudes Rest
const api = require('./routes')

app.use(express.static(`${__dirname}/public`))

app.use(express.urlencoded({extended : false}))
//Admitir peticiones con cuerpo en formato JSON
app.use(express.json())

app.use('/api', api)

/*Defaul 404 - CORS*/
app.use(cors(/* {
    origin: ["*"], //http://localhost:3001
    methods: ["*"],
    allowedHeaders: ["*"]
} */));

// Se conecta a la bd
mongoose.connect(config.db,{ useNewUrlParser: true },(err, res) =>{
    if(err) {
        return console.log(`Error al conectar a la base de datos : ${err}`)
    }
    console.log('Conexion a la base de datos a sido establecida...')
    
// El puerto en que debe escuchar y el mensaje que mostrará cuando está corriendo la app
    app.listen(config.port, ()=>{
        console.log(`API REST corriendo en https://localhost:${config.port}`) 
    })
})
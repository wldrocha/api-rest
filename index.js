// Se importa mongoose para la bd
const mongoose = require('mongoose')
// Se importa las rutas
const app = require('./app')
// Se importan las configuraciones
const config = require('./config')

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



// se importan los middlewares
const express = require('express')
const bodyParser = require('body-parser')
// se instancia el middleware express en la constante app
const app = express()
//se añade la constante asignada y si no existe se asigna el puerto
const port = process.env.PORT || 3000

// 
app.use(bodyParser.urlencoded({extended : false}))
//Admitir peticiones con cuerpo en formato JSON
app.use(bodyParser.json())

// Solicitudes REST
// Solicitud get que recibe un parametro y lo imprime en la respuesta
app.get('/user', (req, res, next)=> {
    res.send({"mensaje": 'Enlista los usuarios'})
})

// solicitud get con parametros
app.get('/user/:userId', (req,res, next)=>{
    let userId = parseInt(req.params.userId)
    res.status(200).send({"mensaje":`El usuario seleccionado es ${userId}`})
})

// solicitud post
app.post('/user', (req,res, next)=>{
    //user.push('wlady2')
    console.log(req.body)
    res.status(200).send({"mensaje": `quieres guardar y los usuarios son`})
})

// solicitud put 
app.put('/user/:userId', (req, res, next) =>{
    res.send({"mensaje": 'Actualizas todo'})
})

// solicitud patch
app.patch('/user/:userId', (req, res, next)=>{
    res.status(200).send({"mensaje": 'Actualiza por partes'})
})

// El puerto en que debe escuchar y el mensaje que mostrará cuando está corriendo la app
app.listen(port, ()=>{
    console.log(`API REST corriendo en https://localhost:${port}`) 
})

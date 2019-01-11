// se importan los middlewares
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

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
app.get('/product', (req, res, next)=> {
    res.send({mensaje: 'Enlista los usuarios'})
})

// solicitud get con parametros
app.get('/product/:productId', (req,res, next)=>{
    let productId = parseInt(req.params.productId)
    res.status(200).send({mensaje:`El usuario seleccionado es ${productId}`})
})

// solicitud post
app.post('/product', (req,res, next)=>{

    console.log('POST api/product')
    console.log(req.body)
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price  = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err,productStored)=>{
        if(err) res.status(500).send({mensaje: `Error al conectar a la Base de datos : ${err}`})

        res.status(200).send({product: productStored})
    })
})

// solicitud put 
app.put('/product/:productId', (req, res, next) =>{
    res.send({mensaje: 'Actualizas todo'})
})

// solicitud patch
app.patch('/product/:productId', (req, res, next)=>{
    res.status(200).send({mensaje: 'Actualiza por partes'})
})

mongoose.connect('mongodb://localhost:27017/shop',{ useNewUrlParser: true },(err, res) =>{
    if(err) {
        return console.log(`Error al conectar a la base de datos : ${err}`)
    }
    console.log('Conexion a la base de datos a sido establecida...')
    
// El puerto en que debe escuchar y el mensaje que mostrará cuando está corriendo la app
    app.listen(port, ()=>{
        console.log(`API REST corriendo en https://localhost:${port}`) 
    })
})



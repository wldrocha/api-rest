// se importan los middlewares
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

// se instancia el middleware express en la constante app
const app = express()
//se añade la constante asignada y si no existe se asigna el puerto
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended : false}))
//Admitir peticiones con cuerpo en formato JSON
app.use(bodyParser.json())

// Solicitudes REST
// Solicitud get que recibe un parametro y lo imprime en la respuesta
app.get('/product', (req, res)=> {
    Product.find({},(err,products)=>{
        // pinta un error si no se conecta a la bd
        if(err) return res.status(500).send({mensaje: `Error al conectar a la Base de datos : ${err}`})
        // devuelve error si no encuentra los productos
        if(!products) return res.status(404).send({mensaje: 'No existen productos registrados'})
        // devuelve los productos encontrados
        res.status(200).send({products})
    })
})

// solicitud get con parametros
app.get('/product/:productId', (req,res)=>{
    let productId = req.params.productId
    
    Product.findById(productId, (err, product)=>{
         // pinta un error si no se conecta a la bd
        if(err) return res.status(500).send({mensaje: `Error al conectar a la Base de datos : ${err}`})
        // devuelve un error si no encuentra el producto
        if(!product) return res.status(404).send({mensaje: 'No existen el producto'})
        // devuelve los productos encontrados
        res.status(200).send({product})
    })
})

// solicitud post
app.post('/product', (req,res)=>{
    // imprime la dirección en la consola
    console.log('POST api/product')
    // imprime la solicitud enviada
    console.log(req.body)
    // se instancia un nuevo objeto de SchemeProduct
    let product = new Product()
    // se asigna los valores de la solicutd recibida a Scheme Products para guardar en la bd
    product.name = req.body.name
    product.picture = req.body.picture
    product.price  = req.body.price
    product.category = req.body.category
    product.description = req.body.description
    // Se intenta guardar el producto
    product.save((err,productStored)=>{
        // si existe un error al guardar el producto devuelve esto
        if(err) res.status(500).send({mensaje: `Error al conectar a la Base de datos : ${err}`})
        // Si el producto es guardado correctamente devuelve en consola sus datos
        res.status(200).send({product: productStored})
    })
})

// solicitud put 
app.put('/product/:productId', (req, res) =>{
    // Se recupera el id de los parametros
   let productId = req.params.productId
    // Se asigna todos los valores a actualizar
   let update = req.body
    //Busca el producto por Id y lo actualiza
   Product.findByIdAndUpdate(productId, update, (err, productUpdated) =>{
       // si existe un error al guardar el producto devuelve esto
       if(err) res.status(500).send({mensaje: `Error al conectar a la Base de datos : ${err}`})
        //si el producto es actualizado devuelve el producto
       res.status(200).send({ mensaje: productUpdated})
   })
})

// solicitud delete
app.delete('/product/:productId', (req, res)=>{
    // Se recupera el id de los parametros
    let productId = req.params.productId
    // Se busca el producto a actualizar y se intenta eliminar
    Product.findByIdAndDelete(productId,(err, product)=>{
        // Se informa de un error si no se puede eliminar
        if(err) res.status(500).send(`Error al eliminar el producto ${err}`)
        // si el producto es eliminado se devuelve el mensaje satisfactorio
        res.status(200).send({ mensaje:  'Producto eliminado satisfactoriamente'})
    })
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



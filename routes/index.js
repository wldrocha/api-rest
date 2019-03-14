const express = require('express')
const auth = require('../middlewares/auth')
const api = express.Router()
// se importa el controlador de los productos
const productCtrl = require('../controllers/product')

// Solicitudes REST
// Solicitud get que recibe un parametro y lo imprime en la respuesta
api.get('/product',productCtrl.getProducts)
// solicitud get con parametros
api.get('/product/:productId',productCtrl.getProduct)
// solicitud post
api.post('/product',productCtrl.saveProduct)
// solicitud put 
api.put('/product/:productId',productCtrl.updateProduct)
// solicitud delete
api.delete('/product/:productId',productCtrl.deleteProduct)
api.get('/private', auth, (req, res)=>{
    res.status(200).send({ mensaje: 'Tienes acceso'})
})

module.exports = api

//nota en esto revisar el ultimo metodo get
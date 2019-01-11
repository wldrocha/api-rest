const express = require('express')
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

module.exports = api
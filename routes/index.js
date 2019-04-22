const express = require('express')
const cors = require('cors');
const auth = require('../middlewares/auth')
const router = express.Router()
// se importa el controlador de los productos
const productCtrl = require('../controllers/product')

// Solicitudes REST
// Solicitud get que recibe un parametro y lo imprime en la respuesta
router.get('/products',cors(), productCtrl.getProducts)
// solicitud get con parametros
router.get('/product/:productId',cors(), productCtrl.getProduct)
// solicitud post
router.post('/product',cors(), productCtrl.saveProduct)
// solicitud put 
router.put('/product/:productId',cors(), productCtrl.updateProduct)
// solicitud delete
router.delete('/product/:productId',cors(), productCtrl.deleteProduct)
router.get('/private', auth, (req, res)=>{
    res.status(200).send({ mensaje: 'Tienes acceso'})
})

module.exports = router

//nota en esto revisar el ultimo metodo get
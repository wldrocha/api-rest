// Se invoca el modelo
const Product = require('../models/product')
const getProducts = async(req, res)=>{
    try{
        const products = await Product.find({});
        if(products.length>0) res.status(200).json({products})
        // devuelve error si no encuentra los productos
        res.status(404).json({message: 'Products are not found'})
    }catch (err){
        res.status(500).json({message: `Error al conectar a la Base de datos : ${err}`})
    }
}

const getProduct = async (req, res)=>{
    const productId = req.params.productId
    try{
        const product = await Product.find({_id: productId})
        if(product.length>0) res.status(200).json({product})
        res.status(404).json({message: 'Product are not found'})
    }catch (err){
        res.status(500).json({message: `Error al conectar a la Base de datos : ${err}`})
    }

    
}

const saveProduct= async(req, res)=>{

     const newProduct = new Product(req.body)
     // Se intenta guardar el producto
     newProduct.save()
     .then( product =>{
         // Si el producto es guardado correctamente devuelve en consola sus datos
         res.status(200).send({product})
     }).catch( err =>{
         // si existe un error al guardar el producto devuelve esto
         res.status(500).send({message: `Error al conectar a la Base de datos : ${err}`})
     })
}

function updateProduct(req, res){
// Se recupera el id de los parametros
    let productId = req.params.productId
// Se asigna todos los valores a actualizar
    let update = req.body
//Busca el producto por Id y lo actualiza
Product.findByIdAndUpdate(productId, update)
//si el producto es actualizado devuelve el producto
    .then(product =>{
        res.status(200).send({product})
    }).catch(err =>{
// si existe un error al guardar el producto devuelve esto
        res.status(500).send({message: `Error al conectar a la Base de datos : ${err}`})
    })
    

}

function deleteProduct(req, res){
    // Se recupera el id de los parametros
    let productId = req.params.productId
    // Se busca el producto a actualizar y se intenta eliminar
    Product.findByIdAndDelete(productId)
    .then(product =>{
        // si el producto es eliminado se devuelve el message satisfactorio
        res.status(200).send({ message:  'Producto eliminado satisfactoriamente'})

    }).catch(err =>{
        // Se informa de un error si no se puede eliminar
        res.status(500).send(`Error al eliminar el producto ${err}`)

    })
}

module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}
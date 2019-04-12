const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = Schema({
    name: String,
    description: String,
    picture: String,
    price : {type: Number, default: 0},
    category: {type: String, enum:['computers', 'phones', 'accesories']},
    description: String
})

// Se exporta para poder usar en otra parte de la app y se coloca como modelo de mongoose
module.exports = mongoose.model('Product', ProductSchema)
module.exports = {
    //se verifica el puerto asignado y si no existe se asigna
    port: process.env.PORT || 3000,
    // 
    db: process.env.MONGODB || 'mongodb://localhost:27017/shop'
}
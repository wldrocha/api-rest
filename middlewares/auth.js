 const service = require ('../service')
 function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({ mensaje: 'Usted no tiene autorización'})
    }

    const token = req.headers.authorization.split(' ')[1]
    
    service.decodeToken(token)
        .then(res =>{
            req.user = res
            next();
        })
        .catch( res => {
            res.status(res.status)
        })

} 
module.exports = isAuth
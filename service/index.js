const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
    const decoded = new Promise((resolved, reject)=>{
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if( payload.exp <= moment.unix()){
                reject({
                    status: 404,
                    mensaje: 'El Token ha expirado'
                })
            }
            resolve(payload.sub)
        }catch{
            reject({
                status: 500,
                mensaje: 'Token invalido'
            })
        }
    })
    return decoded
}
module.exports ={
    createToken,
    decodeToken
}
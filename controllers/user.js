const  User = require('../models/user')
const service = require('../service')

function signUp (req, res){
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayname,
        password: req.body.password
    })

    user.save(err=>{
        if(err) res.status(500).sed({ mensaje: `Error al crear el usuario : ${err}` })

        return res.status(201).send({ token: service.createToken(user) })
    })
}

function signIn(req, res){
        User.find({email: req.body.email}, (err, user)=>{
        if(err) return res.status(500).send({ mensaje: err})
        if(!user) return res.status(404).send({mensaje: 'no existe el usuario'})
        
        req.user = user
       
        res.status(200).send({
            mensaje: 'Te logueaste correctamente',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    signIn,
    signUp
}
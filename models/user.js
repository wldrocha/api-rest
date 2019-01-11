// se importan los middlewares
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Se crea el modelo de la BD
const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true },
    displayName : String,
    avatar: String,
    password: { type: String, select: false},
    signupDate: {Type : Date, default: Date.now() },
    lastLogin: Date
})

// un eveto que ocurre antes de salvar  
UserSchema.pre('save', next=>{
    let user = this
    if(!user.isModified('password')) return next()

    // se genera la salt
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err)
        // Se encripta la contraseña
        bcrypt.hash(user.password. salt, null, (err, hash)=>{
            if(err) return next(err)
            user.password= hash
            next()
        })
    })
})

UserSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
  
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
  }
  
  module.exports = mongoose.model('User', UserSchema)
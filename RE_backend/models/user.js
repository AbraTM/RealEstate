const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 45
    },
    email: {
        type: String, 
        required: [true, "Please provide an email"],
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ],
        unique: true
    },
    isGoogleAuth: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: function() {
            return !this.isGoogleAuth
        },
        select: false
    },
    googleID: {
        type: String,
        unique: true,
        sparse: true  
    },
    userType: {
        type: String,
        enum: ["owner", "builder"]
    },
    country: {
        type: String,
    }

}, {timestamps: true})

userSchema.pre('save', async function(next){
    if(this.isGoogleAuth){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.createJWT = function(){
    return jwt.sign(
        {userID: this._id, name: this.name},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    )
}

userSchema.methods.comparePasswords = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = new mongoose.model('User', userSchema)
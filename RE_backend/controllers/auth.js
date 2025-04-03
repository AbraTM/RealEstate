const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')

const register = async (req, res) => {
    let newUser = {}
    try {
        newUser = await User.create({...req.body})
    } catch (error) {
        console.log(error)
        throw new BadRequestError("Please provide all the details")
    }
    const token = newUser.createJWT()
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        domain: process.env.NODE_ENV === "production" ? "real-estate-theta-neon.vercel.app" : "localhost",
        maxAge: 24 * 60 * 60 * 1000 // One Day Equivalent
    }).status(StatusCodes.ACCEPTED).json({msg: "Successfully Registered!!"})
}

const login = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide both password and email")
    }
    const existingUser = await User.findOne({ email }).select("+password")
    if(!existingUser){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = await existingUser.comparePasswords(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Incorrect Password")
    }
    const token = existingUser.createJWT()
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        domain: process.env.NODE_ENV === "production" ? "real-estate-theta-neon.vercel.app" : "localhost",
        maxAge: 24 * 60 * 60 * 1000 // One Day Equivalent
    }).status(StatusCodes.ACCEPTED).json({msg : "Succesfully Logged In!!"})
}


module.exports = {
    register, 
    login
} 
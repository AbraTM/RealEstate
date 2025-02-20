const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const User = require("../models/user")

const authenticationMiddleware = async (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    const token = req.cookies.access_token
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "No token provided"})
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userInfo = await User.findOne({_id : payload.userID})
        req.user = userInfo
        next();
    }catch(error){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Invalid or expired token"})
    }
}

module.exports = authenticationMiddleware
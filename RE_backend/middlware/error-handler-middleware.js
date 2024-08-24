const CustomAPIError = require("../errors/custom-error")
const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError){
        return res.json({msg : err.message, err : err})
    }
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg : "Something went wrong, please try again later", err : err})
}

module.exports = errorHandlerMiddleware
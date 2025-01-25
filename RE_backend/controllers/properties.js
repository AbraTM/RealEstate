const { StatusCodes } = require("http-status-codes")
const PropertyDetails = require("../models/property-details")

const getAllProperties = async (req, res) => {
    const { sort } = req.query
    let result = PropertyDetails.find({}, {"_id" : 1, "Availability" : 1, "Property_for" : 1,"Property_Type" : 1, "Building" : 1, "Locality" : 1, "City" : 1, "Rent" : 1, "Cover_Image" : 1})

    //Sorting
    if( sort ){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('Rent')
    }

    //Pagging
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit

    const properties = await result.skip(skip).limit(limit)
    res.status(StatusCodes.OK).json({data: properties});
}


module.exports = {
    getAllProperties
}
const PropertyDetails = require("../models/property-details")

const createPropertyDetails = async(req, res) => {
    const createProperty = await PropertyDetails.create(req.body)
    res.json({msg : "Data Received", data : createProperty._id})
}

const getPropertyPreview = async(req, res) => {
    const propertyID = req.params.id
    const property = await PropertyDetails.find({_id : propertyID})
    res.json({msg : "Request Successfull", property: property})
}

module.exports = {
    createPropertyDetails,
    getPropertyPreview
}
const PropertyDetails = require("../models/property-details")
const { validateRequiredFields }= require("../util/validateRequiredField")
const { BadRequestError } = require('../errors/index')
const { uploadOnCloudinary } = require('../util/cloudinary.js')
const { StatusCodes } = require("http-status-codes")


const createPropertyDetails = async(req, res) => {
    const requiredFields = [
        "Property_For", "Property_Type", "Built_Up_Area", "Carpet_Area", "Property_Facing", "Property_On_Floor", "Total_Floors", "Property_Age", "BHK_Type", "Bathrooms", "Balcony", "Tenant_Preference", "Availability", "Property_Description", "Building", "Locality", "Non_Veg", "Pets_Allowed", "Electricity", "Water_Supply", "Rent", "Security"
    ]
    const missingRequiredFields = validateRequiredFields(req.body, requiredFields)
    if(missingRequiredFields.length > 0){
        throw new BadRequestError(`Please provide ${missingRequiredFields.join(", ")}`)
    }

    const coverImageLocalPath = req.files.Cover_Image ? req.files?.Cover_Image[0]?.path : null
    if(!coverImageLocalPath){
        throw new BadRequestError("Please provide a Cover Image")
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    const imagesArray = req.files.Images || [];
    const imageURLs = [coverImage.url]
    if(imagesArray.length > 0){
        for(const img of imagesArray){
            const imagePath = img.path
            const uploadedImage = await uploadOnCloudinary(imagePath)
            imageURLs.push(uploadedImage.url)
        }
    }

    const property = await PropertyDetails.create(
        {
            ...req.body, 
            Cover_Image: coverImage.url,
            Images : imageURLs
        }
    )
    
    return res.status(StatusCodes.OK).json({data: property.id, property})
}

const getPropertyPreview = async(req, res) => {
    const propertyID = req.params.id
    const property = await PropertyDetails.find({_id : propertyID})
    res.json({propertyData : property})
}

module.exports = {
    createPropertyDetails,
    getPropertyPreview
}
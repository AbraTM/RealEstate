const mongoose = require("mongoose")

const propertyDetailSchema = new mongoose.Schema({
    Property_For : {
        type : String,
        required : [true, "Please select what is the property for"],
        enum : ["Rent", "Sale"]
    },
    Property_Type : {
        type : String,
        required : [true, "Please select what is the property type"],
        enum : ["Residential", "Commercial", "Land / Plot"]
    },
    Built_Up_Area : {
        type : Number,
        required : [true, "Please provide built up area"],
    },
    Carpet_Area : {
        type : Number,
        required : [true, "Please provide carpet area"],
    },
    Property_Facing :{
        type : String,
        required : [true, "Please provide property facing direction"],
        enum : ["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]
    },
    Property_On_Floor : {
        type : Number,
        required : [true, "Please provide on what floor the property is"],
    },
    Total_Floors : {
        type : Number,
        required : [true, "Please provide the total number of floors"],
    },
    Property_Age : {
        type : String,
        required : [true, "Please provide the property age"],
        enum : [
            "Less than 1 Year",
            "1 - 3 Years",
            "3 - 5 Years",
            "5 - 10 Years",
            "Greater than 10 Years"
        ]
    },
    BHK_Type : {
        type : String,
        required : [true, "Please provide the BHK type"],
        enum : [
            "1 RK",
            "1 BHK",
            "2 BHK",
            "3 BHK",
            "4 BHK",
            "5+ BHK"
        ]
    },
    Bathrooms : {
        type : String,
        required : [true, "Please provide the number of bathrooms"],
        enum : ["1", "2", "3", "4", "5", "6+"]
    },
    Balcony : {
        type : String,
        required : [true, "Please provide the number of balconies"],
        enum : ["0", "1", "2", "3", "4+"]
    },
    Tenant_Preference : {
        type : String,
        required : [true, "Please provide the tenant preference"],
        enum : [
            "Any", 
            "Family", 
            "Bachelor (Man)", 
            "Bachelor (Women)"
        ]
    },
    Availability : {
        type : String,
        required : [true, "Please provide the availability"],
        enum : [
            "Immediate",
            "Within 15 days",
            "Within 1 month",
            "Within 2 months"
        ]
    },
    Property_Description : {
        type : String,
        required : [true, "Please provide the property description"],
    },
    Building : {
        type : String,
        required : [true, "Please provide the building"],
    },
    Locality : {
        type : String,
        required : [true, "Please provide the locality/area"],
    },
    Landmark : {
        type : String
    },
    City : {
        type : String
    },
    Map_Location : {
        type : [String],
    }, 
    Non_Veg : {
        type : String,
        required : [true, "Please provide the food preference"],
        enum : ["Allowed", "Not Allowed"]
    },
    Pets_Allowed : {
        type : String,
        required : [true, "Please provide whether pets are allowed or not"],
        enum : ["Yes", "No"]
    },
    Electricity : {
        type : String,
        required : [true, "Please provide the information about electricity"],
        enum : ["Rare / No Powercut", "Frequent Powercut"]
    },
    Water_Supply : {
        type : String,
        required : [true, "Please provide the information about the water supply"],
        enum : ["Municipal Corporation (BMC)", "Borewell", "Both"]
    },
    Society_Amenities : {
        type : [String],
    }, 
    Rent : {
        type : Number,
        required : [true, "Please provide the rent"],
    },
    Security : {
        type : Number,
        required : [true, "Please provide the security amount"],
    },
    Price_Detail_Description : {
        type : String,
    }, 
    Images : {
        type: String
    }
})

module.exports = new mongoose.model("PropertyDetails", propertyDetailSchema)
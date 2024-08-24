import React from "react";
import "./list-property-page.css"
import Bell from './assets/bell.svg'
import PropertyDetails from "./form-components/property-details/property-details";
import LocationDetails from "./form-components/location-details/location-details";
import FeaturesAndAmeneties from "./form-components/features&amenities/features&amenities";
import PriceDetails from "./form-components/price-details/price-details";
import PropertyImages from "./form-components/property-images/property-images";
import { useMultiStepForm } from "../../useMultiStepForm"
import Overlay from "../../components/overlay/overlay";

export default function ListPropertyPage(){
    const [formData, setFormData] = React.useState({
            Property_For : "",
            Property_Type : "",
            Residential_Dropdown : "",
            Commercial_Dropdown : "",
            Built_Up_Area : null,
            Carpet_Area : null,
            Property_On_Floor : null,
            Total_Floors : null,
            Property_Facing : "",
            Property_Age : "",
            BHK_Type : "",
            Bathrooms : "",
            Balcony : "",
            Tenant_Preference : "",
            Availability : "",
            Property_Description : "", //Property_details end here
            Building : "",
            Locality : "",
            Landmark : "",
            City : "",
            Map_Location : "", // Location Details end here
            Non_Veg : "",
            Pets_Allowed : "",
            Electricity : "",
            Water_Supply : "",
            Society_Amenities : "", //Features and amenities
            Rent : "",
            Security : "",
            Price_Detail_Description : "", //Price Details end here
            Images : ""
    })

    function handleChange(event){
        const {name, value, type, checked, files} = event.target
        setFormData(prevForm => {
            return {
                ...prevForm,
                [name] : type === "checkbox" ? (checked === true ? value : null ) : value
            }
        })
    }

    function getMapLocation(position){
        setFormData(prevForm => {
            return {
                ...prevForm,
                Map_Location : position
            }
        })
    }

    function getAmenities(amenitiesList){
        setFormData(prevForm => {
            return {
                ...prevForm,
                Society_Amenities : amenitiesList
            }
        })
    }

    // function getPropertyImages(files){
    //     setFormData(prevForm => {
    //         return {
    //             ...prevForm,
    //             Images : files
    //         }
    //     })
    // }

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultiStepForm([
        <PropertyDetails {...formData} handleChange={handleChange}/>, 
        <LocationDetails {...formData} handleChange={handleChange} getMapLocation={getMapLocation}/>,
        <FeaturesAndAmeneties {...formData} handleChange={handleChange} getAmenities={getAmenities}/>,
        <PriceDetails {...formData} handleChange={handleChange}/>, 
        <PropertyImages {...formData} handleChange={handleChange}/>
    ])

    
    const [displayOverlay, setDisplayOverlay] = React.useState(false)
    function handleSubmit(e){
        e.preventDefault()
        if(!isLastStep){
            return next()
        }
        setDisplayOverlay(true)
    }

    return(
        <div className="list-property-page">
            <img src={Bell} className="bell-icon"/>
            <form className="lp-form-cn" onSubmit={handleSubmit}>
                <div className="lp-form-top-padding">
                    <div className={`${currentStepIndex === 0 ? "activeStyle" : (currentStepIndex > 0 ? "completedStyle" : "")}             lp-form-link-text`} style={{borderTopLeftRadius : "16px"}} 
                    >
                        PROPERTY DETAILS
                    </div>
                    <div className={`${currentStepIndex === 1 ? "activeStyle" : (currentStepIndex > 1 ? "completedStyle" : "")} lp-form-link-text`} 
                    >
                        LOCATION DETAILS
                    </div>
                    <div className={`${currentStepIndex === 2 ? "activeStyle" : (currentStepIndex > 2 ? "completedStyle" : "")} 
                    lp-form-link-text`} 
                    >
                        FEATURES & AMENITIES
                    </div>
                    <div className={`${currentStepIndex === 3 ? "activeStyle" : (currentStepIndex > 3 ? "completedStyle" : "")} 
                    lp-form-link-text`}   
                    >
                        PRICE DETAILS
                    </div>
                    <div className={`${currentStepIndex === 4 ? "activeStyle" : (currentStepIndex > 4 ? "completedStyle" : "")} 
                    lp-form-link-text`} style={{borderTopRightRadius : "16px"}}
                    >
                        PROPERTY IMAGES
                    </div>
                </div>
                <div className="lp-form">
                    {step}
                </div>
                <div className="lp-form-bottom-padding">
                    <div>Need Help? <span>Call 9999999999</span></div>
                    <div className="btn-cn">
                        {/* {!isFirstStep && <button type="button" className="previous" onClick={back}>PREV</button>} */}
                        <button type="submit" className="next">
                            {isLastStep ? "SAVE" : "NEXT"}
                        </button>
                    </div>
                </div>
            </form>
            {displayOverlay && <Overlay data={formData}/>}
        </div>
    )
}


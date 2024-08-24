import React from "react";
import "./property-details.css"

export default function PropertyDetails({formData, handleChange}){

    const createOptions = (data, name) =>{
        const dataElements = data.map((item, index) => {
            return(
                <div className="custom-radio-cn-A" key={index}>
                    <input required type="radio" value={item} id={`${name} : ${item}`} name={name} className="custom-radio-A" onChange={event => handleChange(event)}/>
                    <label htmlFor={`${name} : ${item}`} className="custom-radio-label-A">{item}</label>
                </div>
            )
        })
        return dataElements
    }
    const [dropdown, setDropdown] = React.useState("")
    const residentialDropdown = [
        "Flat / Aprtment",
        "House / Villa"
    ]
    const commercialDropdown = [
        "Office Space",
        "Co Working",
        "Restaurant / Cafe",
        "Showroom / Shop",
        "Industrial Bldg.",
        "Industrial Shed",
        "Warehouse / Godown"
    ]
    const residentialDropdownElements = createOptions(residentialDropdown, "Residential_Dropdown")
    const commercialDropdownElements = createOptions(commercialDropdown, "Commercial_Dropdown")

    const handleAdditionalDropdown = (event) => {
        setDropdown(event.target.value)
    }

    // Property Age Options
    const propertyAge = [
        "Less than 1 Year",
        "1 - 3 Years",
        "3 - 5 Years",
        "5 - 10 Years",
        "Greater than 10 Years"
    ]
    const propertyAgeElements = createOptions(propertyAge, "Property_Age")

    //BHK Type
    const bhkType = [
        "1 RK",
        "1 BHK",
        "2 BHK",
        "3 BHK",
        "4 BHK",
        "5+ BHK"
    ]
    const bhkTypeElements = createOptions(bhkType, "BHK_Type")

    //Bathrooms
    const bathrooms = ["1", "2", "3", "4", "5", "6+"]
    const bathroomElements = createOptions(bathrooms, "Bathrooms")

    //Balcony
    const balcony = ["0", "1", "2", "3", "4+"]
    const balconyElements = createOptions(balcony, "Balcony")

    //Tenant Preference
    const tenant = ["Any", "Family", "Bachelor (Man)", "Bachelor (Women)"]
    const tenantElements = createOptions(tenant, "Tenant_Preference")

    //Availabilty
    const availabilty = ["Immediate", "Within 15 days", "Within 1 month", "Within 2 months"]
    const availabiltyElements = createOptions(availabilty, "Availability")

    return(
        <div className="property-details">
            <div className="property-details-form">
                <div>
                    <h1><span style={{color: "red"}}>*</span>Property for :</h1>
                    <div className="radio-btns-cn">
                        <div className="radio-btn-cn">
                            <input required type="radio" id="rent" value="Rent" name="Property_For" onChange={event => handleChange(event)}/>
                            <label htmlFor="rent" className="info-label">Rent</label>
                        </div>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="sale" value="Sale" name="Property_For" onChange={event => handleChange(event)}/>
                            <label htmlFor="sale" className="info-label">Sale</label>
                        </div>
                    </div>
                </div>

                <div>
                    <h1><span style={{color: "red"}}>*</span>Property Type :</h1>
                    <div className="radio-btns-cn">
                        <div className="radio-btn-cn">
                            <input required type="radio" id="residential" value="Residential" name="Property_Type" onChange={event => {
                                handleChange(event)
                                handleAdditionalDropdown(event)
                            }}/>
                            <label htmlFor="residential" className="info-label">Residential</label>
                        </div>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="commercial" value="Commercial" name="Property_Type" onChange={event => {
                                handleChange(event)
                                handleAdditionalDropdown(event)
                            }}/>
                            <label htmlFor="commercial" className="info-label">Commercial</label>
                        </div>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="land/plot" value="Land / Plot" name="Property_Type" onChange={event => handleChange(event)}/>
                            <label htmlFor="land/plot" className="info-label">Land / Plot</label>
                        </div>
                    </div>
                    <div className="ptype-dropdown">
                        {
                            dropdown === "Residential" ? 
                            residentialDropdownElements : 
                            dropdown === "Commercial" ?
                            commercialDropdownElements : 
                            ""
                        }
                    </div>
                </div>

                <div className="grid-temp">
                    <div className="info-cn">
                        <label htmlFor="built-up-area" className="info-label">Built up Area<span style={{color: "red"}}>*</span></label>
                        <input required type="numeric" id="built-up-area" name="Built_Up_Area" placeholder="0 Sq.Ft." className="placeholder-space info-input" onChange={event => handleChange(event)}/>
                    </div>

                    <div className="info-cn">
                        <label htmlFor="carpet-area" className="info-label">Carpet Area<span style={{color: "red"}}>*</span></label>
                        <input required type="numeric" id="carpet-area" name="Carpet_Area" placeholder="0 Sq.Ft." className="placeholder-space info-input" onChange={event => handleChange(event)}/>
                    </div>
                </div>

                <div className="grid-temp">
                    <div className="floor-grid">
                        <div className="info-cn">
                            <label htmlFor="property-on-floor" className="info-label">Property on Floor<span style={{color: "red"}}>*</span></label>
                            <input required type="numeric" id="property-on-floor" name="Property_On_Floor" placeholder="Floor" className="info-input" onChange={event => handleChange(event)}/>
                        </div>

                        <div className="info-cn">
                            <label htmlFor="total-floors" className="info-label">Total Floors<span style={{color: "red"}}>*</span></label>
                            <input required type="numeric" id="total-floors" name="Total_Floors" placeholder="Total Floors" className="info-input" onChange={event => handleChange(event)}/>
                        </div>
                    </div>

                    <div className="info-cn">
                        <label htmlFor="property-facing" className="info-label">Property Facing<span style={{color: "red"}}>*</span></label>
                        <select required name="Property_Facing" className="select-loc info-select" onChange={event => handleChange(event)} defaultValue="Select">
                            <option value="Select">Select</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                            <option value="North-East">North-East</option>
                            <option value="North-West">North-West</option>
                            <option value="South-East">South-East</option>
                            <option value="South-West">South-West</option>
                        </select>
                    </div>
                </div>

                <div>
                    <h1>Property Age<span style={{color: "red"}}>*</span></h1>
                    <div className="option-cn-A">
                        {propertyAgeElements}
                    </div>
                </div>

                <div>
                    <h1>BHK Type<span style={{color: "red"}}>*</span></h1>
                    <div className="option-cn-A">
                        {bhkTypeElements}
                    </div>
                </div>

                <div>
                    <h1>Bathrooms / Toilets<span style={{color: "red"}}>*</span></h1>
                    <div className="option-cn-A">
                        {bathroomElements}
                    </div>  
                </div>

                <div>
                    <h1>Balcony<span style={{color: "red"}}>*</span></h1>
                    <div className="option-cn-A">
                        {balconyElements}
                    </div>
                </div>

                <div>
                    <h1>Tenant Preference<span style={{color: "red"}}>*</span></h1>
                    <div className="option-cn-A">
                        {tenantElements}
                    </div>
                </div>

                <div>
                    <h1>Availability<span style={{color: "red"}}>*</span></h1>
                    <div className="option-cn-A">
                        {availabiltyElements}
                    </div>
                </div>

                <div>
                    <h1>Property Description<span style={{color: "red"}}>*</span></h1>
                    <textarea  type="textarea" name="Property_Description" className="text-area" rows="7" cols="100" onChange={event => handleChange(event)} defaultValue="Add a description for your property to attract the best tenant">
                    </textarea>
                </div>
            
            </div>
        </div>
    )
}


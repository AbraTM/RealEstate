import React from "react";
import "./features&amenities.css"
import { amenities } from "./amenities";

export default function FeaturesAndAmeneties({formData, handleChange, getAmenities}){
    //Removing extra stuff for simplicity
    // const createOptions = (data, name) => {
    //     const dataElements = data.map((item) => {
    //         return (
    //             <div className="custom-radio-cn-B">
    //                 <input type="radio" value={item} id={item.split(" ").join("")} name={name} className="custom-radio-B"/>
    //                 <label for={item.split(" ").join("")} className="custom-radio-label-B">{item}</label>
    //             </div>
    //         )
    //     })
    //     return dataElements
    // }

    // // Furnishing
    // const furnishing = ["Fully Furnished", "Semi Furnished", "Unfurnished"]
    // const furnishingElements = createOptions(furnishing, "Furnishing")

    // //Additional Features
    // const addFeatures = [
    //     "Air Conditioning",
    //     "Ceiling Fans",
    //     "Refrigerator",
    //     "Washing Machine",
    //     "Microwave",
    //     "Oven"
    // ]
    // const addFeaturesElements = createOptions(addFeatures, )

    // //Tiles
    // const tiles = ["Normal White Tiles", "Marble", "Vitrified Tiles"]
    // const tilesElements = createOptions(tiles)

    // //Safety
    // const safety = ["24/7 Security personnel (Gated Security)", "Security Systems- CCTV"]
    // const safetyElements = createOptions(safety)

    //Society Amenities
    const [amenitiesList, setAmenitiesList] = React.useState([])
    const newHandleChange = (event, data) => {
        handleChange(event)
        setAmenitiesList(prev => {
            let tempList = prev
            tempList.push(data)
            return tempList
        })
        getAmenities(amenitiesList)
    }

    const amenitiesElements = amenities.map((item, index) => {
        const passData = item.name
        return(
            <div className="custom-checkbox-cn-C" key={index}>
                <img src={`/amenities/${item.url}`} className="custom-checkbox-label-C"/>
                <input type="checkbox" className="custom-checkbox-input-C" value={item.name} name="Society_Amenities" onChange={event => newHandleChange(event, passData)}/>
            </div>
        )
    })

    return(
        <div className="f-a">
            <div className="f-a-form">
                <h1 style={{fontSize: "20px"}}>General feature</h1>
                <div>
                    <h1><span style={{color: "red"}}>*</span>Non - Veg</h1>
                    <div className="radio-btns-cn" style={{width: "500px"}}>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="allowed" value="Allowed" name="Non_Veg" onChange={event => handleChange(event)}/>
                            <label htmlFor="allowed" className="info-label">Allowed</label>
                        </div>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="not-allowed" value="Not Allowed" name="Non_Veg" onChange={event => handleChange(event)}/>
                            <label htmlFor="not-allowed" className="info-label">Not Allowed</label>
                        </div>
                    </div>  
                </div>

                <div>
                    <h1><span style={{color: "red"}}>*</span>Pets Allowed</h1>
                    <div className="radio-btns-cn" style={{width: "500px"}}>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="yes" value="Yes" name="Pets_Allowed" onChange={event => handleChange(event)}/>
                            <label htmlFor="yes" className="info-label">Yes</label>
                        </div>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="no" value="No" name="Pets_Allowed" onChange={event => handleChange(event)}/>
                            <label htmlFor="no" className="info-label">No</label>
                        </div>
                    </div>
                </div>

                <div>
                    <h1><span style={{color: "red"}}>*</span>Electricity</h1>
                    <div className="radio-btns-cn" style={{width: "500px"}}>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="rare" value="Rare / No Powercut" name="Electricity" onChange={event => handleChange(event)}/>
                            <label htmlFor="rare" className="info-label">Rare / No Powercut</label>
                        </div>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="frequent" value="Frequent Powercut" name="Electricity" onChange={event => handleChange(event)}/>
                            <label htmlFor="frequent" className="info-label">Frequent Powercut</label>
                        </div>
                    </div>
                </div>

                <div>
                    <h1><span style={{color: "red"}}>*</span>Water Supply</h1>
                    <div className="radio-btns-cn" style={{width: "600px"}}>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="bmc" value="Municipal Corporation (BMC)" name="Water_Supply" onChange={event => handleChange(event)}/>
                            <label htmlFor="bmc" className="info-label">Municipal Corporation (BMC)</label>
                        </div>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="borewell" value="Borewell" name="Water_Supply" onChange={event => handleChange(event)}/>
                            <label htmlFor="borewell" className="info-label">Borewell</label>
                        </div>
                        <div className="radio-btn-cn">
                            <input required type="radio" id="both" value="Both" name="Water_Supply" onChange={event => handleChange(event)}/>
                            <label htmlFor="both" className="info-label">Both</label>
                        </div>
                    </div>
                </div>

                <div className="division-line"></div>

                {/* <div>
                    <h1><span style={{color: "red"}}>*</span>Furnishing</h1>
                    <div className="option-cn-C">
                        {furnishingElements}
                    </div>
                </div>

                <div>
                    <h1>Additional Features</h1>
                    <div className="option-cn-C">
                        {addFeaturesElements}
                    </div>
                </div>

                <div>
                    <h1>Tiles</h1>
                    <div className="option-cn-C">
                        {tilesElements}
                    </div>
                </div>

                <div>
                    <h1>Safety</h1>
                    <div className="option-cn-C">
                        {safetyElements}
                    </div>
                </div> */}

                <div>
                    <h1>Society Amenities</h1>
                    <div className="option-cn-C">
                        {amenitiesElements}
                    </div>
                </div>
            </div>
        </div>
    )
}
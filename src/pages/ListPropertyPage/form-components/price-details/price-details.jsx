import React from "react";
import "./price-details.css"

export default function PriceDetails({formData, handleChange}){
    return(
        <div className="price-details-cn">
            <div className="pd-form">
                <div className="grid-temp">
                    <div className="info-cn">
                        <label htmlFor="rent-amt" className="info-label">Rent<span style={{color: "red"}}>*</span></label>
                        <input required type="numeric" id="rent-amt" name="Rent" placeholder="&#8377; /Month" className="placeholder-space info-input" onChange={(event) => handleChange(event)}/>
                    </div>

                    <div className="info-cn">
                        <label htmlFor="security-amt" className="info-label">Security<span style={{color: "red"}}>*</span></label>
                        <input required type="numeric" id="security-amt" name="Security" placeholder="&#8377; /Month" className="placeholder-space info-input" onChange={event => handleChange(event)}/>
                    </div>
                </div>

                {/* <div className="grid-temp">
                    <div className="info-cn">
                        <label htmlFor="maintenance-choose" className="info-label">Maintenance<span style={{color: "red"}}>*</span></label>
                        <select className="select-loc info-select" name="maintenance-choose">
                            <option value="" disabled selected hidden>Select</option>
                            <option value="included-in-rent">Included in Rent</option>
                            <option value="extra-maintenance">Extra Maintainance</option>
                        </select>
                    </div>

                    <div className="floor-grid">
                        <div className="info-cn">
                            <label htmlFor="maintenance-amt" className="info-label">Maintenance<span style={{color: "red"}}>*</span></label>
                            <input type="numeric" placeholder="&#8377;" name="maintenance-amt" className="info-input"/>
                        </div>

                        <div className="info-cn">
                            <select className="select-loc info-select" name="maintenance-choose">
                                <option value="Monthly" selected>Monthly</option>
                                <option value="Quaterly">Quaterly</option>
                                <option value="Semi-Annualy">Semi-Annualy</option>
                                <option value="Annualy">Annualy</option>
                            </select>
                        </div>
                    </div>   
                </div> */}

                <div>
                    <h1>Additional Pricing details to convey to agent?</h1>
                    <textarea type="textarea" className="text-area" rows="7" cols="100" name="Price_Detail_Description" onChange={event => handleChange(event)} defaultValue="Do you have any concerns regarding pricing of your property? Add your concerns here or call us. ">
                    </textarea>
                </div>
            </div>
        </div>
    )
}
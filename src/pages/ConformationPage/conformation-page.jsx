import React from "react";
import "./conformation-page.css"
import { useLocation, useNavigate } from "react-router-dom";

export default function ConformationPage(){
    const navigate = useNavigate()
    const loc = useLocation()
    const propertyID = loc.state.data
    return(
        <div className="conformation-page">
            <div className="conformation-page-content">
                <h1>Thank you for listing your property with us,</h1>
                <p>Your listing will be reviewed and will go live within 24 hours.</p>
                <p style={{width: "900px"}}>We will now manage your listing and get in touch with you after finding the best suitable tenant as per your preference. </p>
                <h3>-Dylan Estates</h3>
                <div className="conformation-page-btns">
                    <button className="edit-property-btn">Edit Property Listing</button>
                    <button className="preview-property-btn" onClick={() => navigate("/property-preview", {state : propertyID , replace : true})}>Preview Property Listing</button>
                </div>
            </div>
        </div>
    )
}
import React from "react";
import "./property-preview.css"
import { useLocation } from "react-router-dom";
import MarkerSVG from "./assets/marker.svg"
import HeartSVG from "./assets/heart.svg"
import DownloadSVG from "./assets/download.svg"
import CameraSVG from "./assets/camera.svg"
import PlusSVG from "./assets/plus.svg"
import LeftArrow from "./assets/left-arrow.svg"
import RightArrow from "./assets/right-arrow.svg"
import CrossSVG from "./assets/cross.svg"
import axios from "axios";
import Footer from "../../components/footer/footer";
import RightHalfBottom from "./assets/right-half-bottom.svg"

export default function PreopertyPreview(){
    const loc = useLocation()
    const propertyID = loc.state

    const [data, setData] = React.useState()

    React.useEffect(() => {
        const getData = async () =>{
            const res = await axios.get(`https://realestate-b6hy.onrender.com/api/v1/list-property-form/${propertyID}`)
            setData(res.data.property[0])
        }
        getData()
    }, [])

    const propertyOverviewData = [
        {
            data : data?.BHK_Type.slice(0, 1),
            url : "bedrooms.svg",
            name : "Bedrooms"
        },
        {
            data : data?.Bathrooms,
            url : "bathrooms.svg",
            name : "Bathrooms"
        },
        {
            data : data?.Built_Up_Area,
            url : "area.svg",
            name : "Sq. ft."
        },
        {
            data : data?.Property_On_Floor,
            url : "floor.svg",
            name : "Property On Floor"
        },
        {
            data : data?.Total_Floors,
            url : "floor.svg",
            name : "Total Floors"
        },
        {
            data : data?.Property_Facing,
            url : "direction.svg",
            name : "Facing"
        },
        {
            data : data?.Balcony === "0" ? "No Balcony" : data?.Balcony,
            url : "balcony.svg",
            name : "Balcony"
        },
        {
            data : data?.Tenant_Preference === "Any" ? "Any(Family / Bachelor)" : data?.Tenant_Preference,
            url : "tenant.svg",
            name : "Tenant Preference"
        },
        {
            data : data?.Availability,
            url : "availability.svg",
            name : "Availability"
        },
        {
            data : data?.Water_Supply,
            url : "water-supply.svg",
            name : "Water Supply"
        },
        {
            data : data?.Pets_Allowed,
            url : "pets-allowed.svg",
            name : "Pets Allowed"
        },
        {
            data : data?.Non_Veg,
            url : "non-veg.svg",
            name : "Non Veg"
        },
        {
            data : data?.Electricity,
            url : "electricity.svg",
            name : "Electricity Status"
        },
        {
            data : data?.Property_Age,
            url : "property-age.svg",
            name : "Property Age"
        },
    ]

    const propertyOverviewElements = propertyOverviewData.map((item, index) => {
        return (
            <div className="po-element" key={index}>
                <div className="po-element-data">
                    <img src={`/property-overview/${item.url}`}></img>
                    {item.data}
                </div>
                <div className="po-element-name">{item.name}</div>
            </div>
        )
    })

    const amenitiesElements = data?.Society_Amenities.map((item, index) => {
        return(
            <img src={`/amenities/${item}.svg`} key={index}></img>
        )
    })

    return (
        <div className="property-preview-page">
            <div className="property-preview">
                <div className="desc-half">
                    <div className="desc-top-section">
                        <h1 className="desc-heading">
                            {data?.BHK_Type} / {data?.Property_Type} {data?.Residential_Dropdown} {data?.Commercial_Dropdown} for {data?.Property_For}
                            in {data?.Building} {data?.Locality} ({data?.Built_Up_Area} Sq. ft.)
                        </h1>

                        <div className="desc-header-l2">
                            <div className="desc-header-l2-text">
                                <img src={MarkerSVG}></img>
                                {data?.Building} {data?.Locality}, {data?.landmark} {data?.City}
                            </div>
                            <div className="desc-header-l2-btns">
                                <img src={HeartSVG}></img>
                                <img src={DownloadSVG}></img>
                            </div>
                        </div>

                        <div className="img-section"> 
                            <div className="img-area">
                                <div className="img-area-center">
                                    <img src={CameraSVG}></img>
                                    <button className="add-photos-btn">
                                        <img src={PlusSVG}></img>
                                        Add Photos Now
                                    </button>
                                </div>
                                <img src={LeftArrow} className="left-arrow" />
                                <img src={RightArrow} className="right-arrow" />
                            </div>
                            <div className="img-sec-bottom-padding">
                                <div className="p-id">Property ID : {data?._id.slice(0,3)}</div>
                                <button className="reject-btn">Reject the property<img src={CrossSVG}></img></button>
                            </div>
                        </div>
                    </div>

                    <div className="bot-shadow"></div>

                    <div className="property-overview-sec">
                        <div className="property-overview-header">
                            <h1 className="property-overview-heading">Property Overview</h1>
                            <div className="property-overview-society">Locality / Area : {data?.Locality}</div>
                        </div>
                        <div className="property-overview-listing">
                            {propertyOverviewElements}
                        </div>
                    </div>

                    <div className="bot-shadow"></div>
                    
                    <div className="amenities-section">
                        <h1>Amenities</h1>
                        <div className="amenities-list">
                            {amenitiesElements}
                        </div>
                    </div>

                    <div className="bot-shadow"></div>

                    <div className="pd-section">
                        <h1 className="pd-header">Description</h1>
                        <p>{data?.Property_Description}</p>
                    </div>

                </div>

                <div className="right-half">
                    <div className="right-half-top">
                        <div>
                            <h1>&#8377; {data?.Rent}<span style={{ fontWeight : "400"}}>/Month</span></h1>
                            <h3>(Rent-Negotiable)</h3>
                        </div>
                        <div>
                            <h1>&#8377; {data?.Security}</h1>
                            <h3>(Deposit)</h3>
                        </div>
                    </div>

                    <img src={RightHalfBottom}></img>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
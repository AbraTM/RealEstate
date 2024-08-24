import React from "react";
import './seller-home-page.css'
import CheckMark from "./assets/checkmark.svg"
import { Link, Outlet, useLocation } from "react-router-dom";

export default function SellerHomePage(){
    const loc = useLocation().pathname.substring(1, 7)
    const navigateTo = loc === "verify" ? "list-property" : "verify"
    return(
        <div className="seller-hp">
            <div className="seller-hp-top">
                <h1>Sell or Rent your Property For Free</h1>
                <p>Whether you’re ready to sell or looking for answers, we’ll guide you with data and expertise specific to your needs.</p>
            </div>
            <div className="seller-hp-bottom">
                <div className="seller-hp-text">
                    <h1>Upload your property in 4  simple steps</h1>
                    <div className="seller-hp-point">
                        <img src={CheckMark}/>
                        <div>Add your properties <span>Basic Details</span></div>
                    </div>
                    <div className="seller-hp-point">
                        <img src={CheckMark}/>
                        <div>Add property <span>Location</span></div>
                    </div>
                    <div className="seller-hp-point">
                        <img src={CheckMark}/>
                        <div>Add property <span>Features and amenities</span></div>
                    </div>
                    <div className="seller-hp-point">
                        <img src={CheckMark}/>
                        <div>Add <span>Price details</span></div>
                    </div>
                    <div className="seller-hp-point">
                        <img src={CheckMark}/>
                        <div>Add your best Property Shots<span>Property Shots</span></div>
                    </div>
                </div>
                <div className="seller-hp-form">
                    <div className="form-top-padding">LETS GET YOU STARTED !</div>
                    <div className="hp-form-cn">
                        <div className="hp-form">
                            <Outlet/>
                        </div>
                    </div>
                    <div className="form-bottom-padding">
                        <div>Need Help? <span>Call 9999999999</span></div>
                        <Link to={navigateTo}>NEXT</Link>
                    </div>
                </div>
            </div>
        </div> 
    )
}
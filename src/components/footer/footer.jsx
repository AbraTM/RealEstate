import React from "react";
import "./footer.css"
import LogoSVG from "./assets/logo.png"
import GlobeSVG from "./assets/globe.svg"

export default function Footer(){
    return(
        <div className="footer">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-left">
                        <img src={LogoSVG} className="footer-logo"></img>
                    </div>
                    <div className="footer-mid">
                        <ul>
                            <li>HOME</li>
                            <li>ABOUT US</li>
                            <li>PROPERTIES</li>
                            <li>EMI CALCULATOR</li>
                            <li>CONTACT US</li>
                            <li>LIST YOUR PROPERTY</li>
                            <li>TESTAMONIALS</li>
                            <li>FAQ’S</li>
                            <li>SAVED SEARCHES</li>
                            <li>EXPLORE NEIGHBORHOOD</li>
                        </ul>
                    </div>
                    <div className="footer-right">
                        <div>
                            <h1>CONTACT US</h1>
                            <p>BS-44, Chandani Chowk, Delhi, India</p>
                        </div>
                        <div>
                            <h1>OFFICE HOURS</h1>
                            <p>8:00 AM to  8:00 PM</p>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        © 2024 Real Estate. All rights reserved.
                        Privacy Policy | Terms & Conditions 
                    </p>
                    <div>
                        <div>
                            <img src={GlobeSVG}></img>
                            <div className="bold-underline">English (IN)</div>
                        </div>
                        <div>
                            <span>&#8377;</span>
                            <div className="bold-underline">INR</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
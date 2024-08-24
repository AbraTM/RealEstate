import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./navbar.css"
import Logo from "./assets/nav-logo.png"
import LanguageSVG from "./assets/language.svg"
import ProfileSVG from "./assets/profile.svg"

export default function NavBar(){
    const loc = useLocation()
    const navType = loc.pathname

    const activeStyles = {
        textDecoration: "underline",
        textUnderlineOffset : "4px",
        textDecorationThickness : "2px"
    }
    return(
    <div>
        <nav className="navbar">
            <Link to={"/"}>
                <img src={Logo} className="nav-logo" style={{textDecoration: "underline"}}></img>
            </Link>
            {
                navType != "/property-preview" ?
                <nav className="nav-options">
                    <NavLink to={"/properties"} style={({isActive}) => isActive ? activeStyles : null }>PROPERTIES</NavLink>
                    <NavLink to={"/dashboard"} style={({isActive}) => isActive ? activeStyles : null }>MY DASHBOARD/ACTIVITY</NavLink>
                    <NavLink to={"/list-property"} style={({isActive}) => isActive ? activeStyles : null }>LIST YOUR PROPERTY</NavLink>
                    <NavLink to={"/contact-us"} style={({isActive}) => isActive ? activeStyles : null }>CONTACT US</NavLink>
                    <div className="nav-divider-line"></div>
                    <img src={LanguageSVG}></img>
                    <img src={ProfileSVG}></img>
                </nav>
                :
                <nav className="nav-options">
                    <NavLink to={"/all-properties"}>ALL PROPERTIES</NavLink>
                    <NavLink to={"/wishlist"}>WISHLIST</NavLink>
                    <NavLink to={"/saved-search"}>SAVED SEARCH</NavLink>
                    <NavLink to={"/list-your-property"}>LIST YOUR PROPERTY</NavLink>
                    <NavLink to={"/more"}>MORE</NavLink>
                    <div className="nav-divider-line"></div>
                    <img src={LanguageSVG}></img>
                    <img src={ProfileSVG}></img>
                </nav>
            }
        </nav>
        <Outlet/>
    </div>
    )
}
import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css"

export default function NotFound(){
    return(
        <div className="not-found-cn">
            <div className="not-found">
                <div className="nf-txt">
                    Sorry, the page you were looking for is under development.
                </div>
                <Link to = "/">
                    <button className="nf-return-btn">Return To Home</button>
                </Link>
            </div>
        </div>
    )
}
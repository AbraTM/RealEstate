import React from "react";
import "./verify.css"
import { Link } from "react-router-dom";

export default function Verify(){
    return(
        <div className="verify">
            <div className="verify-top">
                <div>
                    Enter OTP sent on 999-999-9999
                    <span style={{color: "red"}}>*</span>
                </div>
                <Link to="../">Change</Link>
            </div>

            <input type="numeric" placeholder="0 0 0 0 0" className="info-input"/>

            <div className="verify-bottom">Resend OTP</div>
        </div>
    )
}
import React from "react";
import "./overlay.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Overlay(props){
    const [buttonText, setButtonText] = React.useState("Continue")
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate()
    console.log(props.data)
    const postData = async() => {
        try {
            setButtonText("Saving...")
            const {data} = await axios.post('https://dylanestate.onrender.com/api/v1/list-property-form', props.data, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
            navigate("conformation-page", {state : data})
        } catch (error) {
            setErrorMessage("Invalid Information Provided")
        }
    }

    const handleErrorNav = () => {
        navigate(0)
    }
    
    return(
        <div className="overlay">
            {
                !errorMessage  ?
                <div className="overlay-content">
                    <h1>POST PROPERTY ON DYLAN ESTATE?<span style={{color: "red"}}>*</span></h1>
                    <div className="overlay-btn">
                        <button onClick={postData}>{buttonText}</button>
                        <div>
                            By continuing you agree to our 
                            <span>Terms and Conditions & Privacy Policy</span>
                        </div>
                    </div>
                </div>
                :
                <div className="overlay-content-error">
                    <h1>{errorMessage}</h1>
                    <button onClick={handleErrorNav}>Try Again</button>
                </div>  
            }
        </div>
    )
}
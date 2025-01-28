import React from "react";
import "./overlay.css"
import { useNavigate } from "react-router-dom";

export default function Overlay(props){
    const [buttonText, setButtonText] = React.useState("Continue")
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate()
    const formData = props.data
    console.log(formData)
    const postData = async() => {
        try {
            const form = new FormData();
            Object.keys(formData).forEach(key => {
                if(key === "Cover_Image" && formData.Cover_Image){
                    form.append(key, formData.Cover_Image[0])
                }else if(key === "Images" && formData.Images.length > 0){
                    Array.from(formData.Images).forEach((file) => {
                        form.append(key, file)
                    })
                }else if(formData[key]){
                    form.append(key, formData[key])
                }
            })
            setButtonText("Saving...")
            const response = await fetch("http://realestate-b6hy.onrender.com/api/v1/list-property-form", {
                method: 'POST',
                body: form,
                mode: 'cors'
            })
            console.log(response)
            const res = await response.json()
            navigate("conformation-page", {state : res.data})
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
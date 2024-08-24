import React from "react";
import "./property-images.css"
import CameraIcon from "./assets/camera.svg"
import PlusSVG from "./assets/plus.svg"

export default function PropertyImages({formData, handleChange, }){
    const [selected, setSelected] = React.useState("")

    const handlePhotoUpload = (event) => {
        setSelected(URL.createObjectURL(event.target.files[0]))
        handleChange(event)
        // const filesList = event.target.files
        // getPropertyImages(filesList)
    }
     return(
        <div className="property-images-cn">
            <div className="pi-form">
                <h1>Add Photos / videos to attract more tenants! </h1>

                <p>Add Photos of living room, bedroom, bathroom, floor, doors, kitchen, balcony, location map, neighborhood, etc</p>

                <div className="photo-upload-cn">
                    {!selected ? 
                        <div className="upload-btn-cn">
                            <img src={CameraIcon}/>
                            <div className="upload-btn">
                                <input type="file" id="Property_Images" multiple name="Images" onChange={handlePhotoUpload}/>
                                <label htmlFor="Property_Images">
                                    <img src={PlusSVG}/>
                                    Add Photos Now
                                </label>
                            </div>
                        </div>
                        :
                        <img src={selected} className="uploaded-image"/>
                    } 
                </div>
            </div>
        </div>
    )
}
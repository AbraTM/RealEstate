import React from "react";
import "./property-images.css"
import CameraIcon from "./assets/camera.svg"
import PlusSVG from "./assets/plus.svg"
import { useRef } from "react";

export default function PropertyImages({formData, handleFileChange }){
    const [coverImage, setCoverImage] = React.useState("")
    const [selected, setSelected] = React.useState("")
    
    const compRef = useRef(null)
    React.useEffect(() => {
        if(compRef.current){
            compRef.current.scrollIntoView({ behavior: "instant", block: "start"})
        }
    }, [])
    
    const handlePhotoUpload = (event) => {
        if(event.target.id === "Cover_Image"){
            setCoverImage(URL.createObjectURL(event.target.files[0]))
        }else{
            setSelected(URL.createObjectURL(event.target.files[0]))
        }
        handleFileChange(event)
        // const filesList = event.target.files
        // getPropertyImages(filesList)
    }
     return(
        <div className="property-images-cn" ref={compRef}>
            <div className="pi-form">
                <h1>Cover Image (Required)</h1>
                <p>Please upload an image that best represents your property. This will be used as the main image on the listing.</p>
                <div className="photo-upload-cn">
                    {!coverImage ? 
                        <div className="upload-btn-cn">
                            <img src={CameraIcon}/>
                            <div className="upload-btn">
                                <input type="file" id="Cover_Image" name="Cover_Image" onChange={handlePhotoUpload} required/>
                                <label htmlFor="Cover_Image">
                                    <img src={PlusSVG}/>
                                    Add Photo
                                </label>
                            </div>
                        </div>
                        :
                        <img src={coverImage} className="uploaded-image"/>
                    } 
                </div>



                <h1>Add more photos / videos to attract more tenants! </h1>

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
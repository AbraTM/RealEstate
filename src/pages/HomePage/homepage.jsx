import React from 'react'
import "./homepage.css"
import PropertyDetailsIcon from "./assets/property-details.png"
import LocationDetailsIcon from "./assets/location.png"
import FeaturesIcon from "./assets/features.png"
import PriceIcon from "./assets/price.png"
import ImagesIcon from "./assets/images.png"
import { Link } from "react-router-dom"
import Loading from "../../components/loading/loading"
import Footer from "../../components/footer/footer"

const API_BASE_URL = import.meta.env.VITE_API_URL

export default function Homepage() {
  console.log("API-URL : " + API_BASE_URL)
  const [propertiesData, setPropertiesData] = React.useState([])
  React.useEffect(() => {
    const getData = async () => {
      const data = await fetch(`${API_BASE_URL}/api/v1/properties`)
      const res = await data.json()
      console.log(res)
      setPropertiesData(res.data)
    }
    getData()
  }, [])
  const propertyElements = propertiesData.length > 0 ? propertiesData.slice(0, 3).map((item, index) => {
    return (
      <Link to={`/properties/${item._id}`} key={index}>
          <div className="property-card">
              <img className="p-card-image" src={item?.Cover_Image ?? Default_House}/>
                <div className="white-box">
                  <div>{item.Building}</div>
                  <div>{item.Locality}, {item.City}</div>
                </div>
          </div>
      </Link>  
    )
  }) : null
  return (
    <div className='home'>
      <div className='home-top'>
        <nav className='home-top-nav'>
          <Link to={"/properties"}>PROPERTIES</Link >
          <Link to={"/user-profile"}><img src='./profile.png' className='profile-link-img'/></Link>
        </nav>
        <div className='home-mid'>
          <img src='./logo-white.png' className='home-logo'/>
        </div>
        <div className='home-btm'>LIST YOUR OWN NOW..</div>
        <div className='bg-video-cn'>
          <div className='blur'></div>
          <video autoPlay loop muted playsInline>
            <source src="./bg.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>
      <div className='home-steps'>
        <h3>HOW TO LIST</h3>
        <h1>List your property in 5 simple steps</h1>
        <ul className='listing-steps'>
          <li>
            <img src={PropertyDetailsIcon}></img>
            <div><span>1. </span>Add Property Details</div>
            <p>Begin by telling us a few basic details about your property, such as the property type, number of rooms, and other essential information.</p>
          </li>
          <li>
            <img src={LocationDetailsIcon}></img>
            <div><span>2. </span>Add Location Details</div>
            <p>Provide the exact location of your property, including the address, nearby landmarks, and city details.</p>
          </li>
          <li>
            <img src={FeaturesIcon}></img>
            <div><span>3. </span>Add Features and Amenities</div>
            <p>Highlight key features and amenities, such as parking, security, garden, swimming pool, or any other unique offerings.</p>
          </li>
          <li>
            <img src={PriceIcon}></img>
            <div><span>4. </span>Add Price Details</div>
            <p>Set the price for your property and mention additional charges like the security.</p>
          </li>
          <li>
            <img src={ImagesIcon}></img>
            <div><span>5. </span>Upload Photos and Videos</div>
            <p>Enhance your listing with high-quality images and videos that showcase your property from different angles.</p>
          </li>
        </ul>
        <Link to={'/list-property'}className='start-listing'>Begin Listing your Property</Link>
      </div>
      <div className='home-recent'>
        {propertiesData.length != 0 ? <h1>Recently Listed Properties</h1> : <div></div>}
        {propertiesData.length === 0 
          ? 
          <Loading /> 
          :
          <div className='recent-p'>{propertyElements}</div>
        }
      </div>
      <Footer />
    </div>
    
  )
}

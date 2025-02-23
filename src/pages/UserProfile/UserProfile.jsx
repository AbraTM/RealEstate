import React from 'react'
import "./UserProfile.css"
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import Footer from "../../components/footer/footer"

export default function UserProfile() {
    const navigate = useNavigate()
    const [ userInfo, setUserInfo ] = React.useState()
    const [ propertiesData, setPropertiesData ] = React.useState([])
    const [ gottenProperties, setGottenProperties ] = React.useState(false)
    const logout = async () => {
      try {
        await fetch("https://realestate-b6hy.onrender.com/auth/logout", {
          method: "GET",
          credentials: "include"
        })
        if(!res.ok){
          throw new Error(`${res.status}, ${res.statusText}`)
        }    
        console.log("Here")
      } catch (error) {
        console.error("Error : " + error)
      }
      navigate("/")
      window.location.reload()
    }

    React.useEffect(() => {
      const getUserInfo = async () => {
        const res = await fetch("https://realestate-b6hy.onrender.com/auth/userInfo", {
          method: "GET",
          credentials: "include"
        })
        const data = await res.json();
        setUserInfo(data.user)
      }
      const getUserProperties = async() => {
        const res = await fetch("https://realestate-b6hy.onrender.com/api/v1/properties/user", {
          method: "GET",
          credentials: "include"
        })
        const data = await res.json()
        setPropertiesData(data)
        setGottenProperties(true)
      }
      getUserInfo()
      getUserProperties()
    }, [])

    if(!userInfo){
      return <Loading />
    }

    const propertyElements = propertiesData.map((item, index) => {
          return (
            <Link to={`${item._id}`} key={index}>
                <div className="property-card">
                  <img className="p-card-image" src={item?.Cover_Image ?? Default_House}/>
                  <div className="white-box">
                    <div>{item.Building}</div>
                    <div>{item.Locality}, {item.City}</div>  
                  </div>
                </div>
            </Link>
          )
        })
    console.log(propertyElements)

    return (
      <div className="profile-page">
          <div className="pp-top">
              <div className="pp-top-l">
                <img src="./profile.png" className="profile-img"></img>
                <div className='pp-top-info'>
                    <h1>{userInfo.name}</h1>
                    {userInfo?.userType && <h2>( {userInfo.userType} )</h2>}
                    {userInfo?.country && <h3><b>Country</b><span>{userInfo.country}</span></h3>}
                    <h3><b>Email</b><span>{userInfo.email}</span></h3>
                </div>
              </div>
              <div className="pp-top-r">
                <button onClick={logout} className="pp-top-r-button">
                  <img src="./logout.png"></img>
                  LOGOUT
                </button>
              </div>
          </div>
          <div className="pp-properties">
              <h1>Your Listed Properties</h1>
              {
                propertiesData.length === 0 
                ? 
                  gottenProperties ? <div className="no-properties-msg">You haven't listed any properties yet</div> : <Loading />
                : 
                <div className='ppp-cn'>{propertyElements}</div>
              }
          </div>
          <Footer />
      </div>
    )
}

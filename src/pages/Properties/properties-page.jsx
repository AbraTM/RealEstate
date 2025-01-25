import React from 'react'
import "./properties-page.css"
import Default_House from '../../../public/default-house.jpg'
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/loading';

export default function Properties_Page() {
    const [propertiesData, setPropertiesData] = React.useState([]);
    React.useEffect(() => {
        const getData = async () => {
            const data = await fetch("http://localhost:5000/api/v1/properties")
            const res = await data.json()
            setPropertiesData(res.data)
        }
        getData()
    }, [1])
  
    if(!propertiesData){
      return <Loading/>
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

    return (
      <div className="p-grid-cn">
        <div className="p-grid">{propertyElements}</div>
      </div>
    )
}

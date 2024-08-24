import React, { useState, useRef, useMemo, useCallback }from "react";
import "./location-details.css"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const center = [19.076090, 72.877426]

export default function LocationDetails({formData, handleChange, getMapLocation}){
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const customIcon = new Icon({
      iconUrl : "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
      iconSize : [38, 38]
    })
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            const locData = marker.getLatLng()
            setPosition(Object.values(locData))
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
    React.useEffect(() => {
      getMapLocation(position)
    }, [position])
    return(
        <div className="location-details-cn">
            <div className="grid-temp">
                <div className="info-cn">
                    <label htmlFor="Building/Society-Name" className="info-label">Building / Society-Name<span style={{color: "red"}}>*</span></label>
                    <input required type="text" id="Building/Society-Name" name="Building" placeholder="Enter Apartment Name" className="info-input" onChange={event => handleChange(event)}/>
                </div>

                <div className="info-cn">
                    <label htmlFor="Locality/Area" className="info-label">Locality Area<span style={{color: "red"}}>*</span></label>
                    <input required type="text" id="Locality/Area" name="Locality" placeholder="Eg. Sheetal Nagar" className="info-input" onChange={event => handleChange(event)}/>
                </div>
            </div>

            <div className="grid-temp">
                <div className="info-cn">
                    <label htmlFor="Landmark" className="info-label">Landmark / Street Name</label>
                    <input type="text" id="landmark" name="Landmark" placeholder="Prominent Landmark" className="info-input" onChange={event => handleChange(event)}/>
                </div>

                <div className="info-cn">
                    <label htmlFor="city" className="info-label">City</label>
                    <input type="text" id="city" name="City" placeholder="Mumbai, Maharashtra" className="info-input" onChange={event => handleChange(event)}/>
                </div>
            </div>
            
            <div className="map-cn">
                <MapContainer center={center} zoom={13} >
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      draggable={draggable}
                      eventHandlers={eventHandlers}
                      position={position}
                      ref={markerRef}
                      icon={customIcon}
                    >
                    <Popup minWidth={90}>
                      <span onClick={toggleDraggable}>
                        {draggable
                          ? 'Move Marker'
                          : 'Click here to move the Marker'}
                      </span>
                    </Popup>
                  </Marker>
                </MapContainer>
                {/* <div className="map-input">
                  <label htmlFor="map-loc">Location : </label>
                  <input type="text" htmlFor="map-loc" placeholder={position} name="Map_Location" value={position} readOnly/>
                </div> */}
            </div>
        </div>
    )
}
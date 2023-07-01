import React from 'react'
import {Map,CityListControl ,MapTypeControl,NavigationControl ,ScaleControl,ZoomControl} from 'react-bmapgl';
const Baidu = () => {
  return (
    <Map
      style={{ height: 800 }}
      center={new BMapGL.Point(116.404449, 39.914889)}
      zoom={12}
      heading={0}
      tilt={40}
      onClick={e => console.log(e)}
      enableScrollWheelZoom
      mapType={"norml"}
    >
         <CityListControl />
         <MapTypeControl/>
         <NavigationControl/>
         <ScaleControl/>
         <ZoomControl/>
    </Map>
  )
}

export default Baidu




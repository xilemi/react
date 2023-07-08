


import React, { useEffect, useState } from 'react'

import { Row, Col } from 'antd'
import { Map, Marker ,  Circle, NavigationControl, InfoWindow, ScaleControl, MapTypeControl, ZoomControl, CityListControl } from 'react-bmapgl';

const Baidu = () => {

    const [city, setCity] = useState<string>('')
    const [address, setAddress] = useState<string>('')

    const [lat, setLat] = useState<number>(0)  // latitude   纬度 
    const [lng, setLng] = useState<number>(0)  // longitude  经度

    // 浏览器定位
    const getLocation = () => {
        var map = new BMapGL.Map("container");
        var geolocation = new BMapGL.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            console.log(r)
            // var mk = new BMapGL.Marker(r.point);
            // map.addOverlay(mk);
            // map.panTo(r.point);
            // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        });
    }
    const getLocationByIp = () => {
        var myCity = new BMapGL.LocalCity();
        myCity.get((result) => {
            console.log(result)


            setLat(result.center.lat)
            setLng(result.center.lng)
            setCity(result.name)

            var myGeo = new BMapGL.Geocoder();
            myGeo.getLocation(new BMapGL.Point(result.center.lng, result.center.lat), function (result) {
                if (result) {
                    console.log(result)
                    setAddress(result.address)
                }
            });
        });
    }


    useEffect(() => {
        // getLocation()
        getLocationByIp()
    }, [])

    return (
        <div>
            <Row style={{ marginTop: 20 }}>
                <Col span={22}  >
                    <div className="container" id="container">
                        <Map enableScrollWheelZoom tilt={40} center={{ lng: lng, lat: lat }} zoom="11" style={{ height: 700 }}>
                            <Marker enableDragging position={{ lng: lng, lat: lat }} />
                            <NavigationControl />
                            <MapTypeControl />
                            <ScaleControl />
                            <ZoomControl />
                            <CityListControl />
                            <Circle
                                center={new BMapGL.Point(lng, lat)}
                                radius={5000}
                                strokeColor="#f00"
                                strokeWeight={2}
                                fillColor="#ff0"
                                fillOpacity={0.3}
                            />
                            <InfoWindow position={{ lng: lng, lat: lat }} text={address} title={city} />
                        </Map>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Baidu
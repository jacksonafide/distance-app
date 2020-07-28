import React from 'react';
import classes from './Display.module.css';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {GeodesicLine} from 'react-leaflet-geodesic';

export const LocationIcon = L.icon({
  iconUrl: require('../../assets/location_icon.svg'),
  iconRetinaUrl: require('../../assets/location_icon.svg'),
  iconSize: [35, 35],
  iconAnchor: [10, 27],
  className: 'leaflet-location-icon'
});

const display = (props) => {
    function roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }

    function calculate() {
        let dist = 3963.0 * Math.acos(Math.sin(props.responseObj[0].lat/57.29577951) * Math.sin(props.responseObj[1].lat/57.29577951) + Math.cos(props.responseObj[0].lat/57.29577951) * Math.cos(props.responseObj[1].lat/57.29577951) * Math.cos((props.responseObj[1].lon/57.29577951) - (props.responseObj[0].lon/57.29577951)))
        let distKm = dist * 1.609344
        return [roundToTwo(distKm), roundToTwo(dist)]
    }

    function getCenter() {
        return {lat: (Number(props.responseObj[0].lat) + Number(props.responseObj[1].lat)) / 2, lon: (Number(props.responseObj[0].lon) + Number(props.responseObj[1].lon)) / 2}
    }

    function getZoom() {
        let distance = calculate()[0];
        if (distance < 250)
            return 8;
        else if (distance > 250 && distance < 500)
            return 7;
        else if (distance > 500 && distance < 1000)
            return 6;
        else if (distance > 1000 && distance < 3000)
            return 5;
        else if (distance > 3000 && distance < 5000)
            return 4;
        else if (distance > 5000 && distance < 7000)
            return 3;
        else
            return 2;
    }

    return (
        <div>
            {props.error && <p className = {classes.Error}>{"Did not receive data back from server.\n Check if you entered cities correctly, if yes then likely there is some server issue."}</p>}
            {props.responseObj[0].licence === "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright" ?
                <div className = {classes.ResultBox}>
                    <div className = {classes.DistanceBox}>
                        <p>Distance between cities: {calculate()[0]} [km] | {calculate()[1]} [mi]</p>
                    </div>
                    <div className = {classes.MapBox}>
                        {props.responseObj[1].lat !== undefined ?
                            <Map center = {getCenter()} zoom = {getZoom()}>
                                <TileLayer
                                    url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                />
                                <Marker position = {[props.responseObj[0].lat, props.responseObj[0].lon]} icon = {LocationIcon}>
                                    <Popup>
                                        <p className = {classes.PopupTitle}>{props.responseObj[0].display_name}</p>
                                        <p className = {classes.PopupDesc}>Lat: {roundToTwo(props.responseObj[0].lat)} Lon: {roundToTwo(props.responseObj[0].lon)}</p>
                                    </Popup>
                                </Marker>
                                <Marker position = {[props.responseObj[1].lat, props.responseObj[1].lon]} icon = {LocationIcon}>
                                    <Popup>
                                        <p className = {classes.PopupTitle}>{props.responseObj[1].display_name}</p>
                                        <p className = {classes.PopupDesc}>Lat: {roundToTwo(props.responseObj[1].lat)} Lon: {roundToTwo(props.responseObj[1].lon)}</p>
                                    </Popup>
                                </Marker>
                                <GeodesicLine
                                    positions = {[[Number(props.responseObj[0].lat), Number(props.responseObj[0].lon)],[Number(props.responseObj[1].lat), Number(props.responseObj[1].lon)]]}
                                />
                            </Map>
                        : null
                        }
                    </div>
                </div>
            : null
            }
        </div>
    )
}

export default display;
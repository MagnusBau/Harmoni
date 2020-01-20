import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
const API_KEY =  process.env.REACT_APP_GOOGLE_MAP_KEY;
const MapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} onClick={props.onMarkerClick} />}
    </GoogleMap>
);

export default MapComponent
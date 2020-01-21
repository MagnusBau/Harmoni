import React, { Component } from 'react';
import Map from "./map";

const API_KEY = {key: process.env.REACT_APP_GOOGLE_MAP_KEY};

export class SimpleMap extends Component {

    render() {
        return(
            <Map
                google={this.props.google}
                center={{lat: 63.4154, lng: 10.4055}}
                height='300px'
                zoom={15}
            />
        )
    }
}
export default SimpleMap


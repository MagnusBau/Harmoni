import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_KEY;
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 63.4154,
            lng: 10.4055
        },
        zoom: 14
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={63.415496}
                        lng={10.405554}
                        text="X"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

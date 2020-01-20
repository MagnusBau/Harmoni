import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import MapComponent from "./MapComponent";

const API_KEY = {key: process.env.REACT_APP_GOOGLE_MAP_KEY};
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const mapStyles = {
    width: '100%',
    height: '100%'
};


export class SimpleMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentLatLng: {
                lat: 63.4154,
                lng: 10.4055
            },
            isMarkerShown: false
        }
    }

    componentWillUpdate(){
        this.getGeoLocation()
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.getGeoLocation();
            this.setState({ isMarkerShown: true })
        }, 5000)
    };

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false });
        this.delayedShowMarker()
    };

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords);
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
        } else {
            error => console.log(error)
        }
    };

    render() {
        return (
            <MapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                currentLocation={this.state.currentLatLng}
            />
        )
    }
}
export default SimpleMap

/*const rootElement = document.getElementById("root");
ReactDOM.render(<SimpleMap />, rootElement);*/

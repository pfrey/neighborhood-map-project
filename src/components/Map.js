import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap 
      defaultZoom={8} 
      zoom={props.zoom} 
      defaultCenter={{ lat: 42.3528795, lng: -83.2392901 }}
      center={props.center}
    >
      {props.markers && 
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, index) => {
            const venueInfo = props.venues.find(venue => venue.id === marker.id);
            return (
              <Marker 
                key = { index } 
                position = {{ lat: marker.lat, lng: marker.lng }}
                onClick = { () => props.markerClick(marker) }
              >
                {marker.isOpen &&
                  venueInfo.bestPhoto && (
                    <InfoWindow>
                      <React.Fragment>
                        <p>{ venueInfo.name }</p>
                        <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt="Photo of Venue" />
                      </React.Fragment>
                    </InfoWindow>
                  )
                }
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);

const mapHeight = window.innerHeight

export default class Map extends Component {
	render() {
    return (
      <MyMapComponent
        { ...this.props }
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBNiVrOQqLRb6SuJgjBRM_bQV2hYAs-hRw"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `${mapHeight}px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
	}
}
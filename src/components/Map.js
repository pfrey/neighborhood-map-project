/* global google */
import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const LoadMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={10}
      zoom={props.zoom}
      defaultCenter={{ lat: 42.3523699, lng: -83.3793885 }}
      center={{
        lat: parseFloat(props.center.lat),
        lng: parseFloat(props.center.lng)
      }}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, index, argument) => {
            const venueInfo = props.venues.find(
              venue => venue.id === marker.id
            );

            return (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => props.handleMarkerClick(marker)}
                animation={
                  argument.length === 1
                    ? google.maps.Animation.BOUNCE
                    : google.maps.Animation.DROP
                }
              >


                {marker.isOpen &&
                  venueInfo.contact &&
                  venueInfo.hours && (
                    <InfoWindow>
                      <React.Fragment>
                      <div className="infowindow">
                        <p>
                          {venueInfo.name}<br/>
                          <span className="rating">This location is rated {venueInfo.rating} / 10</span>
                        </p>
                        <hr />
                        <p>
                          Contact Info:<br/>
                          <span>Phone: </span> 
                            {venueInfo.contact.formattedPhone ? ( 
                              <span className="noformat">{venueInfo.contact.formattedPhone}</span>
                            ) : ( 
                              "N/A" 
                            )}
                          <br/>
                          <span>Facebook: </span>
                            {venueInfo.contact.facebookUsername ? ( 
                              <a href={`http://www.facebook.com/${venueInfo.contact.facebookUsername}`} target="_blank">{venueInfo.contact.facebookUsername}</a>
                            ) : ( 
                              "N/A" 
                            )}
                          <br/>
                          <span>Twitter: </span>
                            {venueInfo.contact.twitter ? ( 
                              <a href={`http://www.twitter.com/${venueInfo.contact.twitter}`} target="_blank">{venueInfo.contact.twitter}</a>
                            ) : ( 
                              "N/A" 
                            )}
                        </p>
                        <hr />
                        <p>{venueInfo.hours ? ( <span className="noformat">{venueInfo.hours.status}</span> ) : ( "Contact us for hours." )}</p>
                      </div>
                      </React.Fragment>
                    </InfoWindow>
                  )}
              }
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <LoadMap
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNiVrOQqLRb6SuJgjBRM_bQV2hYAs-hRw"
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div id="map" className="mapContainer" />}
        mapElement={<div className="mapElement" style={{ height: `100vh` }} />}
      />
    );
  }
}

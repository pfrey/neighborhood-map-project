import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import FoursquareAPI from './api/helper';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 10,
      center: [],
      venues: [],
      markers: [],
      updateSuperState: obj => {
        this.setState(obj);
      }
    }
  }

  closeAllInfoWindows = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeAllInfoWindows();

    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);

    FoursquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    });

   
 
    console.log("marker click: ", venue)
  };

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);


    console.log("list item click: ", venue)
  };

  componentDidMount() {
    FoursquareAPI.search({
      query: 'museum',
      near: 'Detroit, MI'
    })
    .then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      });
      this.setState({venues, markers, center});
    });
      

      console.log("venues mounted")
  }

  render() {
    return (
      <main>
        <header id="header">
          <h1>Welcome to the Neighborhood!</h1>
        </header>
        <section>
          <Sidebar {...this.state} handleListItemClick={this.handleListItemClick} />
          <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
        </section>
      </main>
    )
  }
}

export default App;

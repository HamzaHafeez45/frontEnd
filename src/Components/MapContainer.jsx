import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "80%",
  height: "80%",
};

class MapConatiner extends Component {
  state = {
    shops: [],
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: "", // Shows the InfoWindow to the selected place upon a marker
    shopName: "",
  };

  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Shop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ shops: data });
      });
  };

  onMarkerClick = (props, marker, name) => {
    console.log(props);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const { shops } = this.state;
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{
          lat: 31.582045,
          lng: 74.329376,
        }}
      >
        {shops.map((sh) => (
          <Marker
            key={sh.shopId}
            position={{
              lat: sh.latitude,
              lng: sh.longitude,
            }}
            onClick={() => this.onMarkerClick(sh.shopName)}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAekZABtpE_0DT9zx9iId6IjG3JM2I8cA0",
})(MapConatiner);

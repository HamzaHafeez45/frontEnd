import React, { Component } from "react";
import Nav from "../Components/Nav";
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import { ToastContainer, toast } from "react-toastify";
const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAekZABtpE_0DT9zx9iId6IjG3JM2I8cA0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
    onMarkerClick: () => (marker) => {
      toast(`Shop Name  :  ${marker["shopName"]}`);
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={3} defaultCenter={{ lat: 31.582045, lng: 74.329376 }}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map((marker) => (
        <Marker
          key={marker.shopId}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onClick={() => props.onMarkerClick(marker)}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));
class CustomerLocation extends Component {
  state = { markers: [], shopName: "", shopshopPhone: "" };
  componentDidMount = () => {
    fetch("http://sndwebapi.spikotech.com/api/Shop")
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({ markers: data });
      });
  };
  render() {
    return (
      <>
        <Nav />
        <ToastContainer />
        <section>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-xl-10 col-lg-9 col-md-8 ml-auto">
                <h3 className="text-muted text-center">Customers Locations</h3>
                <MapWithAMarkerClusterer markers={this.state.markers} />
                {console.log(this.state.shopName)}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default CustomerLocation;

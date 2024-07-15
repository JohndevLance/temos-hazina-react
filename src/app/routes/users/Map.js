import React from 'react';
import { compose, withProps, withHandlers, withState } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import { APIKEY } from "../../../constants/ActionTypes";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key="+APIKEY+"&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  // withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap 
  defaultZoom={12} 
  defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
  center={{ lat: props.location.lat, lng: props.location.lng }}
  >
    <Marker position={{ lat: props.location.lat, lng: props.location.lng }} />
  </GoogleMap>
));

export default MyMapComponent;

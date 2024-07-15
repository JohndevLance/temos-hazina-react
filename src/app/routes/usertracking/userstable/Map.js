import React from 'react';
import { compose, withProps, withHandlers, withState } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { APIKEY } from "../../../../constants/ActionTypes";

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
)((props) => {
  const labelSize = { width: 220};
  const labelPadding = 8;
return (
  <GoogleMap 
  defaultZoom={12} 
  defaultCenter={{ lat: props.locations[0].lat, lng: props.locations[0].long }}
  center={{ lat: props.locations[0].lat, lng: props.locations[0].long }}
  >
    {props.locations.map((location) => {
      return <MarkerWithLabel
              labelStyle={{ textAlign: "center", width:labelSize.width + 'px', backgroundColor: "#7fffd4", fontSize: "14px", padding:  labelPadding + "px"}}
              labelAnchor={{ x: (labelSize.width/2) + labelPadding , y: 80 }}
              key={location.id}
              position={{ lat: location.lat, lng: location.long }}>
              <span>{location.geotimestamp}</span>
            </MarkerWithLabel>
    })}
    
  </GoogleMap>
)
});

export default MyMapComponent;

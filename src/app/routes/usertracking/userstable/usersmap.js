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
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  // withScriptjs,
  withGoogleMap
)((props) => {
    const labelSize = { width: 220};
    const labelPadding = 8;
  return (<GoogleMap 
  defaultZoom={12} 
  defaultCenter={{ lat: props.locations.length>0 ?props.locations[0].lat : -1.12, lng: props.locations.length>0 ?props.locations[0].long: 36.94 }}
  center={{ lat: props.locations.length>0 ?props.locations[0].lat : -1.12, lng: props.locations.length>0 ?props.locations[0].long: 36.94 }}
  >
    {props.locations.map((location) => {
      return <div>
          {/* <Marker position={{ lat: location.lat, lng: location.long }} /> */}
           <MarkerWithLabel
              labelStyle={{ textAlign: "center", width:labelSize.width + 'px', backgroundColor: "#7fffd4", fontSize: "14px", padding:  labelPadding + "px"}}
              labelAnchor={{ x: (labelSize.width/2) + labelPadding , y: 80 }}
              key={location.id}
              position={{ lat: location.lat, lng: location.long }}>
              <span>{location.geotimestamp}<br></br>{location.user?.full_name}</span>
            </MarkerWithLabel></div>
    })}
    
  </GoogleMap>)
});

export default MyMapComponent;

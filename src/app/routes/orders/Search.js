import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import { APIKEY } from "../../../constants/ActionTypes";
import SearchBar from 'material-ui-search-bar';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        address: '',
        lat : null,
        lng : null
     };
  }
  componentDidMount(){
    
  }
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
          console.log('Success', latLng)
          this.props.setLocation({address : address, latLng : latLng})
      })
      .catch(error => console.error('Error', error));
  };
  
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{}}>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              style={{
                position: 'absolute',
                width: '400px',
                borderRadius: '5px',
                height: '35px',
                padding: '5px 5px 5px 7px',
                border: '1px solid transparent',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                boxSizing: 'border-box',
               }}
              value={this.state.address}
            />
            <div className="autocomplete-dropdown-container"
            style={{
              position: 'absolute',
              top: '36px',
              width: '400px',
             }}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#f0eeee', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput
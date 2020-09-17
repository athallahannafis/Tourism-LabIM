import React, {Component} from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// style
import { globalStyling as gs } from '../../style/global-styling';
import Color from '../../style/color.json';

export default class AttractionMap extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      mapRegion: 0,
      current_latitude: 0,
      current_longitude: 0,
      self_latitude: 0,
      self_longitude: 0,
      place_latitude: 0,
      place_longitude: 0,
      destination: props.route.params,
    });
  }

  componentDidMount = () => {
    this.getMyLocation();
    this.getPlaceLocation();
  }

  getMyLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          self_latitude: position.coords.latitude,
          self_longitude: position.coords.longitude,
        })
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: Platform.OS == "android", timeout: 10000, maximumAge: 5000}
    )
  }

  getPlaceLocation = () => {
    const temp = this.state.destination;
    this.setState({
      place_latitude: temp.coordinates.latitude,
      place_longitude: temp.coordinates.longitude,
      current_latitude: temp.coordinates.latitude,
      current_longitude: temp.coordinates.longitude
    });
  }

  moveToMyLocation = () => {
    this.setState({
      current_latitude: this.state.self_latitude,
      current_longitude: this.state.self_longitude
    })
  }

  render () {
    console.log("self_lat: " + this.state.self_latitude);
    console.log("self_long: " + this.state.self_longitude);
    console.log("place_lat: " + this.state.place_latitude);
    console.log("place_long: " + this.state.place_longitude);
    return (
      <View style={ls.mainContainer}>

        <View style={ls.searchBarContainer}>
          <View style={ls.columnContainer}>
            <Text style={{marginBottom: 7}}>Dari:</Text>
            <Text>Ke:</Text>
          </View>
          <View style={[ls.columnContainer, {marginLeft: 20}]}>
            <View style={[ls.bubble, {marginBottom: 7}]}>
              <Text>Lokasi anda</Text>
            </View>
            <View style={[ls.bubble]}>
              <Text>{this.state.destination.place_name}</Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
          onPress={this.moveToMyLocation}>
            <Text>Go to my location</Text>
          </TouchableOpacity>
        </View>

        {/* Map */}
        <View style={ls.mapContainer}>
          <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: this.state.current_latitude,
            longitude: this.state.current_longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5
          }}
          showsMyLocationButton={true}
          style={ls.map}>
            <MapView.Marker
            coordinate={{
              latitude: this.state.destination.coordinates.latitude,
              longitude: this.state.destination.coordinates.longitude
            }}
            title="Lokasi"
            description="Hi"/>
          </MapView>
        </View>

      </View>
    )
  }
}
const fullHeight = 100;
const mapHeight = 80;
const searchBarHeight = fullHeight - mapHeight;

const ls = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  columnContainer: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    height: 100
  },
  rowContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    width: "70%"
  },
  searchBarContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
    height: searchBarHeight + "%",
    width: "100%",
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",  
    height: "100%"
  },
  mapContainer: {
    height: mapHeight + "%",
    width: "100%",
  },
  bubble: {
    padding: 2,
    paddingLeft: 5,
    borderRadius: 5,
    width: 200,
    backgroundColor: Color.color1,
    
  }
})

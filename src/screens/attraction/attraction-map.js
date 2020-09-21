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
      current_delta: 0.1,
      current_delta: 0.1,
      showMyLoc: {
        opacity: 0.5,
        disabled: true
      },
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
          showMyLoc: {
            opacity: 1,
            disabled: false
          }
        })
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: Platform.OS == "android",
      timeout: 100000, maximumAge: 1000}
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
    console.log(this.state.current_latitude);
    console.log(this.state.current_longitude);
  }

  moveToPlaceLocation = () => {
    this.setState({
      current_latitude: this.state.place_latitude,
      current_longitude: this.state.place_longitude
    });
  }

  render () {
    console.log(`Self coordinate: (${this.state.self_latitude}, ${this.state.self_longitude})`);
    console.log(`Place coordinate: (${this.state.place_longitude}, ${this.state.place_longitude})`)
    return (
      <View style={ls.mainContainer}>
        {/* Map */}
        <View style={ls.mapContainer}>
          <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: this.state.current_latitude,
            longitude: this.state.current_longitude,
            latitudeDelta: 1,
            longitudeDelta: 1
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

        <View style={ls.upperSectionContainer}>
          <View style={ls.searchBarContainer}>
            <View style={ls.columnContainer}>
              <Text style={{marginBottom: 15}}>Dari:</Text>
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

          <View
          style={{
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <TouchableOpacity
            disabled={this.state.showMyLoc.disabled}
            style={[ls.locationButton, {opacity: this.state.showMyLoc.opacity}]}
            onPress={this.moveToMyLocation}>
              <Text style={{fontWeight: "bold", color: "white"}}>
                Go to my location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={ls.locationButton}
            onPress={this.moveToPlaceLocation}>
              <Text style={{fontWeight: "bold", color: "white"}}>
                Go to place location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const fullHeight = 100;
const mapHeight = 75;
const searchBarHeight = fullHeight - mapHeight;

const ls = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff"
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
    paddingVertical: 0,
    // height: searchBarHeight + "%",
    width: "100%",
    backgroundColor: "#fff",
  },
  upperSectionContainer: {
    flex: 0,
    flexDirection: "column",
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
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    width: 200,
    backgroundColor: Color.color1,
  },
  locationButton: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.color2,
    paddingVertical: 13,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    borderRadius: 1000,
  },
})

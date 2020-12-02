import React, {Component} from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

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
        disabled: true,
        buttonMsg: "Getting your location..."
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
            disabled: false,
            buttonMsg: "Go to my location"
          }
        })
      },
      (error) => {
        console.log(error);
        this.getMyLocation();
      },
      {timeout: 100000}
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
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }}
          showsMyLocationButton={true}
          style={ls.map}>
            <MapView.Marker
            coordinate={{
              latitude: this.state.destination.coordinates.latitude,
              longitude: this.state.destination.coordinates.longitude
            }}
            title="Lokasi"
            description={this.state.destination.accomodation_name}/>
          </MapView>
        </View>

        <View style={ls.upperSectionContainer}>
          <View style={ls.searchBarContainer}>
            <View style={ls.columnContainer}>
              <Text style={{marginBottom: 15, fontSize: RFPercentage(1.4)}}>
                Dari:
              </Text>
              <Text style={{fontSize: RFPercentage(1.4)}}>Ke:</Text>
            </View>
            <View style={[ls.columnContainer, {marginLeft: 20}]}>
              <View style={[ls.bubble, {marginBottom: 7}]}>
                <Text style={{fontSize: RFPercentage(1.4)}}>Lokasi anda</Text>
              </View>
              <View style={[ls.bubble]}>
                <Text style={{fontSize: RFPercentage(1.4)}}>{this.state.destination.place_name}</Text>
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
              <Text style={{fontWeight: "bold", color: "white", 
              width: wp(100), textAlign: "center", fontSize: RFPercentage(1.4)}}>
                {this.state.showMyLoc.buttonMsg}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={ls.locationButton}
            onPress={this.moveToPlaceLocation}>
              <Text style={{fontWeight: "bold", color: "white", 
              width: wp(100), textAlign: "center", fontSize: RFPercentage(1.4)}}>
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
const mapHeight = 70;
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
    marginBottom: "4%"
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
    width: wp(40),
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    borderRadius: 1000,
  },
})

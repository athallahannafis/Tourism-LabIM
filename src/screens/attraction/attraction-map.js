import React, {Component} from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

// style
import { globalStyling as gs } from '../../style/global-styling';


export default class AttractionMap extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
    })
  }

  render () {
    return (
      <View style={gs.mainContainer}>
        <Text>Screen for map</Text>
        <View style={{
          width: 400,
          height: 400,
        }}>
          <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}>
          </MapView>
        </View>
      </View>
    )
  }
}
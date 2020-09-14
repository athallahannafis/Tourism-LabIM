import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

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
      <View style={{
        flex: 0,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Text>Screen for map Test</Text>
        <View style={{
          minWidth: 200,
          minHeight: 200,
        }}>
          <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{
            width: 300,
            height: 300,
          }}
          >
          </MapView>
        </View>
      </View>
    )
  }
}

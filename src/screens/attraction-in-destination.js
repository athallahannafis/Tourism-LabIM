import React, {Component} from 'react';
import { View, Text } from 'react-native';

// style
import {globalStyling as gs} from '../style/global-styling';

export default class AttractionInDestination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cityName = this.props.route.params;
    console.log(cityName);
    return (
      <View style={gs.mainContainer}>
        <Text>Attraction in Destination Screen</Text>
        <Text>{cityName}</Text>
      </View>
    )
  }
}
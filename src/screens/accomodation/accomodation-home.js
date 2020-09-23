import React, {Component} from 'react';
import { Text, View } from 'react-native';

// style
import Color from '../../style/color.json';
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';

export default class AccomodationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    }
  }

  render() {
    return (
      <View style={gs.mainContainer}>
        <Text>Accomodation Screen</Text>
      </View>
    )
  }
}
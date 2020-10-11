import React, {Component} from 'react';
import { Text, View } from 'react-native';

// Style
import {globalStyling as gs} from '../../style/global-styling';
import Color from '../../style/color.json';

export default class RestaurantRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    }
  }

  render() {
    return (
      <View>
        <Text>Ini rekomendasi restoran</Text>
      </View>
    )
  }
}
import React, {Component} from 'react';
import { View, Text } from 'react-native';

// Style
import {globalStyling as gs} from '../style/global-styling';

export default class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[
        gs.mainContainer,
      ]}>
        <Text>
          Test screen
        </Text>
      </View>
    )
  }
}
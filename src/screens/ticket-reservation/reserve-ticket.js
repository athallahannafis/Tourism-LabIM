import React, {Component} from 'react';
import { View, Text } from 'react-native';

import {globalStyling as gs} from '../../style/global-styling';

export default class ReserveTicket extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
    })
  }

  render() {
    return (
      <View style={gs.mainContainer}>
        <Text>Ticket reservation</Text>
      </View>
    )
  }
}
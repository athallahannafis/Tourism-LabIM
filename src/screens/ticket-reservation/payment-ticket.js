import React, {Component} from 'react';
import { View, Text } from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import Color from '../../style/color.json';


export default class PaymentTicket extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
    });
  }

  render() {
    const data = this.props.route.params;
    console.log("from payment" + data.chosenTicket);
    return (
      <View style={gs.mainContainer}>
        <Text>Ticket payment Screen</Text>
      </View>
    )
  }
}
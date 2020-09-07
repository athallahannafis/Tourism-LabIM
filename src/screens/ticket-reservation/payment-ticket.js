import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {ticketStyling as ts} from '../../style/ticket-styling';
import Color from '../../style/color.json';


export default class PaymentTicket extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
    });
  }

  render() {
    const RESERVE_DATA = this.props.route.params;
    console.log(RESERVE_DATA);
    return (
      <View style={gs.mainContainer}>
        <Text style={[ts.title, {marginBottom: 30}]}>Order Payment</Text>
        <View style={gs.cardSection}>
          {/* Title */}
          <Text style={ts.title} > {RESERVE_DATA.place_name} </Text>
          <Text> {RESERVE_DATA.city_name} </Text>
        </View>
      </View>
    )
  }
}

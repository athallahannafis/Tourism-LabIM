import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-community/picker';

// data
import Ticket from '../../data-dummy/ticket.json';

// styling
import {globalStyling as gs} from '../../style/global-styling';
import Color from '../../style/color.json';


export default class ReserveTicket extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
      isVisible: false,
      ticketData: [],
      ticketValue: "",
      chosenDate: "",
    })
  }

  showPicker = () => {
    this.setState({
      isVisible: true,
    })
  }

  handlePicker = (date) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(date).format("MMMM, Do YYYY"),
    });
  }

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  }

  fetchTicket = () => {
    const tList = Ticket.data;
    for (let i = 0; i < tList.length; i++) {
      this.state.ticketData.push(tList[i]);
    }
    console.log(this.state.ticketData);
  }

  setTicketValue = (value) => {
    this.setState({
      ticketValue: value
    })
  }

  render() {
    const data = this.props.route.params;
    this.fetchTicket();

    const ticketOption = this.state.ticketData.map((item) => {
      return (
        <Picker.Item label={item.ticket_name} value={item.ticket_name} />
      )
    })

    return (
      <ScrollView>
        <DateTimePicker
        isVisible={this.state.isVisible}
        onConfirm={this.handlePicker}
        onCancel={this.hidePicker}
        />
        <View style={gs.mainContainer}>
          {/* Ticket card */}
          <View style={gs.cardSection} >
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 2
            }} > {data.place_name}</Text>
            <Text> {data.city_name} </Text>

            {/* Date picker
            <>
              <TouchableOpacity
              onPress={() => this.showPicker()}
              style={[
                gs.columnContainer,
                {
                  borderRadius: 100,
                  padding: 20,
                  backgroundColor: Color.color6
                }
              ]}>
                <Text style={{
                  color: "white",
                  fontWeight: "bold",
                }}>Date Picker</Text>
              </TouchableOpacity>
            </> */}

            <View style={[gs.rowContainer, {marginTop: 10}]}>
              {/* Left side (icons) */}
              <View style={gs.columnContainer}>
                <Image
                style={localStyle.smallIcons}
                source={require("../../images/ticket-icons/ticket.png")}
                />
                <Image
                style={localStyle.smallIcons}
                source={require("../../images/ticket-icons/calendar.png")}
                />
                <Image
                style={localStyle.smallIcons}
                source={require("../../images/ticket-icons/person.png")}
                />
              </View>

              {/* Right side (boxes) */}
              <View style={gs.columnContainer}>
                {/* Ticket */}
                <View style={{width: 300, marginLeft: 2}}>
                  <Picker
                  style={localStyle.bubble}
                  selectedValue={this.state.ticketValue}
                  onValueChange={(itemValue) => this.setTicketValue(itemValue)}>
                    {ticketOption}
                  </Picker>
                </View>
                {/* Ticket */}
                <View style={{width: 300, marginLeft: 2}}>
                  <Picker
                  style={localStyle.bubble}
                  selectedValue={this.state.ticketValue}
                  onValueChange={(itemValue) => this.setTicketValue(itemValue)}>
                    {ticketOption}
                  </Picker>
                </View>
                {/* Ticket */}
                <View style={{width: 300, marginLeft: 2}}>
                  <Picker
                  style={localStyle.bubble}
                  selectedValue={this.state.ticketValue}
                  onValueChange={(itemValue) => this.setTicketValue(itemValue)}>
                    {ticketOption}
                  </Picker>
                </View>
              </View>

            </View>
            <Text> {this.state.chosenDate} </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}
const localStyle = StyleSheet.create({
  smallIcons: {
    height: 30,
    width: 30,
  },
  bubble: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    textAlignVertical: 'center',
    borderRadius: 3,
    paddingLeft: 7,
    backgroundColor: '#C1DFE1',
    scaleX: 0.9,
    scaleY: 0.9
  }
})
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
      dateValue: "Tap to select date",
      dataToPost: {
        "chosenTicket": "",
        "chosendDate": "",
        "adult": 0,
        "kids": 0
      },
    })
  }
  // for re-rendering
  componentDidMount = () => {
    console.log(this.state.ticketValue);
  }

  // called only first time rendering
  UNSAFE_componentWillMount = () => {
    this.fetchTicket();
  }

  showPicker = () => {
    this.setState({
      isVisible: true,
    })
  }

  handlePicker = (date) => {
    this.setState({
      isVisible: false,
      dateValue: moment(date).format("DD MMMM YYYY"),
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
  }

  setTicketValue = (value) => {
    this.setState({
      ticketValue: value
    });
  }

  render() {
    const data = this.props.route.params;
    const ticketOption = this.state.ticketData.map((item) => {
      return (
        <Picker.Item label={item.ticket_name} value={item.ticket_name} />
      )
    })

    return (
    
        <View style={gs.mainContainer}>
          <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}/>

          {/* Ticket card */}
          <View style={gs.cardSection} >
            {/* Title */}
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 2
            }} > {data.place_name}</Text>
            <Text> {data.city_name} </Text>

            {/* Input section */}
            <View style={[gs.columnContainer, {marginTop: 10,}]}>
              {/* Ticket */}
              <View style={[localStyle.rowContainer,{width: 250,}]}>
                <Image
                style={localStyle.smallIcons}
                source={require("../../images/ticket-icons/ticket.png")}/>
                <View style={localStyle.bubble}>
                  <Picker
                  mode="dropdown"
                  style={{width: "100%"}}
                  selectedValue={this.state.ticketValue}
                  onValueChange={(itemValue) => this.setTicketValue(itemValue)}>
                    <Picker.Item label="Tap to select ticket" />
                    {ticketOption}
                  </Picker>
                </View>
              </View>
              {/* Calendar */}
              <View style={[localStyle.rowContainer,{width: 250,}]}>
                <Image
                style={localStyle.smallIcons}
                source={require("../../images/ticket-icons/calendar.png")}/>
                <TouchableOpacity style={localStyle.bubble}
                onPress={() => this.showPicker()}>
                  {/* <Text>Date picker</Text> */}
                  <Text style={{fontSize: 17}}> {this.state.dateValue} </Text>
                </TouchableOpacity>
              </View>
              {/* Person */}
              <View style={[localStyle.rowContainer,{width: 250,}]}>
                <Image
                style={localStyle.smallIcons}
                source={require("../../images/ticket-icons/person.png")}/>
                <View style={localStyle.bubble}>
                  <Picker
                  mode="dropdown"
                  style={{width: "100%"}}
                  selectedValue={this.state.ticketValue}
                  onValueChange={(itemValue) => this.setTicketValue(itemValue)}>
                    {ticketOption}
                  </Picker>
                </View>
              </View>
            </View>

            {/* Pesan button */}
            <View style={[gs.columnContainer]}>
              <TouchableOpacity style={localStyle.pesanButton}>
                <Text style={{fontWeight: "bold", color: "white"}}>Pesan</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      
    )
  }
}
const localStyle = StyleSheet.create({
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  smallIcons: {
    height: 40,
    width: 40,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: "center",
    width: 300,
    height: 40,
    textAlignVertical: 'center',
    borderRadius: 10,
    paddingLeft: 7,
    backgroundColor: '#C1DFE1',
    marginVertical: 5,
  },
  pesanButton: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.color6,
    borderRadius: 1000,
    width: 100,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10
  }
})
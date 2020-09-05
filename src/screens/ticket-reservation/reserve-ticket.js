import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, Alert, Modal } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-community/picker';

// data
import Ticket from '../../data-dummy/ticket.json';

// styling
import {globalStyling as gs} from '../../style/global-styling';
import {ticketStyling as ts} from '../../style/ticket-styling';

export default class ReserveTicket extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
      isVisible: false,
      ticketData: [],
      ticketValue: null,
      ticketValuePlaceHolder: "select ticket",
      adultValue: 0,
      childValue: 0,
      dateValue: "Tap to select date",
      dataToPost: {},
      alertPopup: false,
    })
  }
  // for re-rendering
  componentDidMount = () => {
    
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

  orderAlert = (orderData) => {
    if (orderData.chosenTicket === null) {
      Alert.alert(
        "Warning",
        "Select the ticket first",
        [
          {
            text: "OK"
          }
        ],
        {cancelable: false}
      );
      return true;
    } else if (orderData.chosenDate === "Tap to select date") {
      Alert.alert(
        "Warning",
        "Select the date please",
        [
          {
            text: "OK"
          }
        ],
        {cancelable: false}
      );
      return true
    }
  }

  orderTicket = (ticket, date) => {
    const cityData = this.props.route.params;
    // DATA REQUEST STRUCTURE
    this.state.dataToPost = {
      "place_name": cityData.place_name,
      "city_name": cityData.city_name,
      "chosenTicket": ticket,
      "chosenDate": date
    };
    console.log(this.state.dataToPost);
    this.setState({alertPopup: true});
    // if (this.orderAlert(this.state.dataToPost)) return;
    // else this.props.navigation.navigate("Ticket Payment", this.state.dataToPost);
  }

  render() {
    const CITY_DATA = this.props.route.params;
    const ticketOption = this.state.ticketData.map((item) => {
      return (
        <Picker.Item label={item.ticket_name} value={item.ticket_name} />
      )
    })

    return (
        <View style={gs.mainContainer}>
          <Modal
          transparent={true}
          visible={this.state.alertPopup}
          animationType="fade">
            <View style={gs.columnContainer}>
              <View 
              style={{
              width: 100, height: 100, backgroundColor: "red", 
              marginTop: "70%"}}>
                <Text>This is modal</Text>
              </View>
            </View>
          </Modal>

          <DateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker}
          onCancel={this.hidePicker}/>

          {/* Ticket card */}
          <View style={gs.cardSection} >
            {/* Title */}
            <Text style={ts.title}> {CITY_DATA.place_name}</Text>
            <Text> {CITY_DATA.city_name} </Text>

            {/* Input section */}
            <View style={[gs.columnContainer, {marginTop: 10,}]}>
              {/* Ticket */}
              <View style={[ts.rowContainer,{width: 250,}]}>
                <Image
                style={ts.smallIcons}
                source={require("../../images/ticket-icons/ticket.png")}/>
                <View style={ts.bubble}>
                  <Picker
                  mode="dropdown"
                  style={{width: "100%"}}
                  selectedValue={this.state.ticketValue}
                  onValueChange={(itemValue) => this.setTicketValue(itemValue)}>
                    <Picker.Item label="Tap to select ticket" value={null} />
                    {ticketOption}
                  </Picker>
                </View>
              </View>
              {/* Calendar */}
              <View style={[ts.rowContainer,{width: 250,}]}>
                <Image
                style={ts.smallIcons}
                source={require("../../images/ticket-icons/calendar.png")}/>
                <TouchableOpacity style={ts.bubble}
                onPress={() => this.showPicker()}>
                  {/* <Text>Date picker</Text> */}
                  <Text style={{fontSize: 17}}> {this.state.dateValue} </Text>
                </TouchableOpacity>
              </View>
              {/* Person */}
              <View style={[ts.rowContainer,{width: 250,}]}>
                <Image
                style={ts.smallIcons}
                source={require("../../images/ticket-icons/person.png")}/>
                <View style={[ts.personBubble,]}>
                  {/* Dewasa */}
                  <View style={[ts.littleBubble, {width: 140, marginRight: 20}]}>
                    {/* <Picker
                    mode="dropdown"
                    style={{width: "100%"}}
                    selectedValue={this.state.adultValue}
                    onValueChange={(value) => (value)}>

                    </Picker> */}
                  </View>
                  {/* Anak */}
                  <View style={[ts.littleBubble, {width: 140}]}>

                  </View>
                </View>
              </View>
            </View>

            {/* Pesan button */}
            <View style={[gs.columnContainer]}>
              <TouchableOpacity style={ts.pesanButton}
              onPress={() => this.orderTicket(this.state.ticketValue, this.state.dateValue)}>
                <Text style={{fontWeight: "bold", color: "white"}}>Pesan</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      
    )
  }
}

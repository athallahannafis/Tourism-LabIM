import React, {Component} from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
  ColorPropType
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

// data
import Ticket from '../../data-dummy/attraction-data/ticket.json';
import JumlahTicket from '../../data-dummy/attraction-data/jumlah-ticket.json';

// styling
import {globalStyling as gs} from '../../style/global-styling';
import {ticketStyling as ts} from '../../style/ticket-styling';
import Color from '../../style/color.json';

export default class ReserveTicket extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
      isVisible: false,
      ticketData: [],
      ticketValue: null,
      adultTicketData: [],
      childTicketData: [],
      adultTicketValue: null,
      childTicketValue: null,
      dateValue: "Tap to select date",
      dataToPost: {},
      alertPopup: false,
      alertMessage: "",
    })
  }
  // for re-rendering
  componentDidMount = () => {
    
  }

  // called only first time rendering
  UNSAFE_componentWillMount = () => {
    this.fetchTicket();
    this.fetchTicketAmount();
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

  fetchTicketAmount = () => {
    const adultAmount = JumlahTicket.data.jumlah_dewasa;
    const childAmount = JumlahTicket.data.jumlah_anak;
    for (let i = 0; i <= adultAmount; i++) {
      this.state.adultTicketData.push(i);
    }
    for (let i = 0; i <= childAmount; i++) {
      this.state.childTicketData.push(i);
    }
    console.log(this.state.adultTicketData);
    console.log(this.state.childTicketData);
  }

  setTicketValue = (value) => {
    this.setState({
      ticketValue: value
    });
  }

  setAdultValue = (value) => {
    this.setState({
      adultTicketValue: value,
    })
  }

  setChildValue = (value) => {
    this.setState({
      childTicketValue: value
    })
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

  orderCheck = (data) => {
    if (data.chosenTicket === null) {
      this.setState({
        alertPopup: true,
        alertMessage: "Kelas tiket belum dipilih"
      });
      return true;
    } else if (data.chosenDate === "Tap to select date") {
      this.setState({
        alertPopup: true,
        alertMessage: "Tanggal belum ditentukan"
      });
      return true;
    } else if (data.adultTickets === null || data.childTickets === null) {
      this.setState({
        alertPopup: true,
        alertMessage: "Jumlah tiket belum dipilih"
      });
      return true;
    }
    return false;
  }

  orderTicket = (ticket, date, adult, child) => {
    const cityData = this.props.route.params;
    // DATA REQUEST STRUCTURE
    this.state.dataToPost = {
      "place_name": cityData.place_name,
      "city_name": cityData.city_name,
      "chosenTicket": ticket,
      "chosenDate": date,
      "adultTickets": adult,
      "childTickets": child 
    };
    console.log(this.state.dataToPost);
    if (this.orderCheck(this.state.dataToPost)) return;
    else this.props.navigation.navigate("Ticket Payment", this.state.dataToPost);
  }

  render() {
    const CITY_DATA = this.props.route.params;
    const ticketOption = this.state.ticketData.map((item) => {
      return (
        <Picker.Item label={item.ticket_name} value={item.ticket_name} />
      )
    });
    const renderAdultTicket = this.state.adultTicketData.map((item) => {
      return (
        <Picker.Item label={item + " dewasa"} value={item} />
      )
    });
    const renderChildTicket = this.state.childTicketData.map((item) => {
      return (
        <Picker.Item label={item+ " anak"} value={item} />
      )
    })

    return (
        <View style={gs.mainContainer}>
          <Modal
          transparent={true}
          visible={this.state.alertPopup}
          animationType="slide">
            <View style={gs.columnContainer}>
              <View style={ts.modalContainer}>
                <Icon name={'times-circle'} size={80} color={"red"} />
                <Text style={[ts.alertMessage]}>{this.state.alertMessage}</Text>
                <TouchableOpacity style={ts.okButton}
                onPress={() => this.setState({alertPopup: false}) }>
                  <Text style={[ts.title, {color: "white"}]}>OK</Text>
                </TouchableOpacity>
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
                    <Picker.Item label="Tap to select ticket class" value={null}/>
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
                  <View style={[ts.littleBubble, {width: 130, marginRight: 10}]}>
                    <Picker
                    mode="dropdown"
                    style={{width: "110%", scaleX: 0.9, scaleY: 0.9}}
                    selectedValue={this.state.adultTicketValue}
                    onValueChange={(itemValue) => this.setAdultValue(itemValue)}>
                      <Picker.Item label="Dewasa" value={null} />
                      {renderAdultTicket}
                    </Picker>
                  </View>
                  {/* Anak */}
                  <View style={[ts.littleBubble, {width: 130}]}>
                    <Picker
                    mode="dropdown"
                    style={{width: "110%", scaleX: 0.9, scaleY: 0.9}}
                    selectedValue={this.state.childTicketValue}
                    onValueChange={(itemValue) => this.setChildValue(itemValue)}>
                      <Picker.Item label="Anak" value={null}/>
                      {renderChildTicket}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>

            {/* Pesan button */}
            <View style={[gs.columnContainer]}>
              <TouchableOpacity style={ts.pesanButton}
              onPress={() => this.orderTicket(
                this.state.ticketValue, this.state.dateValue,
                this.state.adultTicketValue, this.state.childTicketValue)}>
                <Text style={{fontWeight: "bold", color: "white"}}>Pesan</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      
    )
  }
}

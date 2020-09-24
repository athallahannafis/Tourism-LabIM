import React, {Component} from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-community/picker';

// style
import Color from '../../style/color.json';
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';

export default class AccomodationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkinVisible: false,
      checkoutVisible: false,
      bedValue: null,
      tamuValue: null,
      starValue: null,
      checkinValue: "Tanggal check-in...",
      checkoutValue: "Tanggal check-out..."
    }
  }

  handleCheckin = (date) => {
    this.setState({
      checkinVisible: false,
      checkinValue: moment(date).format("DD MMMM YYYY")
    })
  }

  handleCheckout = (date) => {
    this.setState({
      checkoutVisible: false,
      checkoutValue: moment(date).format("DD MMMM YYYY")
    })
  }

  showCheckin = () => {
    this.setState({checkinVisible: true})
  }

  showCheckout = () => {
    this.setState({checkoutVisible: true})
  }

  hideDate = () => {
    this.setState({checkinVisible: false, checkoutVisible: false});
  }

  setBedValue = (value) => {
    this.setState({bedValue: value});
  }

  setTamuValue = (value) => {
    this.setState({tamuValue: value});
  }

  setStarValue = (value) => {
    this.setState({starValue: value});
  }

  render() {
    return (
      <ScrollView>
        <View style={gs.mainContainer}>

          <DateTimePicker
          isVisible={this.state.checkinVisible}
          onCancel={this.hideDate}
          onConfirm={this.handleCheckin}
          />

          <DateTimePicker
          isVisible={this.state.checkoutVisible}
          onCancel={this.hideDate}
          onConfirm={this.handleCheckout}
          />
          {/* SEARCH SECTION */}
          <View style={gs.cardSection}>
            <Text style={gs.cardTitle}>
              Cari akomodasi terbaik, mulai dari sini!
            </Text>
            <View style={[ls.searchContainer]}>
              {/* Akomodasi sekitar anda */}
              <View style={[ats.rowContainer, {width: "100%"}]}>
                <Image style={ls.smallIcons}
                source={require('../../images/bottomtab-icons/objekWisata.png')}/>
                <TextInput
                style={[ls.textInput, {width: "85%"}]}
                placeholder={"Akomodasi di sekitar anda..."}
                onChangeText={(value) => this.setState({value})}
                />
              </View>

              {/* Checkin dan checkout */}
              <View style={[ats.rowContainer, {width: "100%", marginTop: 8}]}>
                <View style={ats.rowContainer}>
                  <View style={ats.rowContainer}>
                    <Image style={ls.smallIcons}
                    source={require("../../images/ticket-icons/calendar.png")}/>
                    {/* Checkin */}
                    <TouchableOpacity
                    style={ls.bubble}
                    onPress={() => this.showCheckin()}>
                      {this.state.checkinValue === "Tanggal check-in..." ?
                        <Text
                        style={{fontSize: 15,
                          color: "grey", width: 125}}>{this.state.checkinValue}</Text> :
                        <Text
                        style={{fontSize: 15,
                          color: "black",  width: 125}}>{this.state.checkinValue}</Text>
                      }
                    </TouchableOpacity>
                    {/* Checkout */}
                    <TouchableOpacity
                    style={[ls.bubble, {marginLeft: 26}]}
                    onPress={() => this.showCheckout()}>
                      {this.state.checkoutValue === "Tanggal check-out..." ?
                        <Text
                        style={{fontSize: 15,
                          color: "grey", width: 125}}>
                            {this.state.checkoutValue}
                        </Text>
                        :
                        <Text
                        style={{fontSize: 15,
                          color: "black", width: 125}}>
                            {this.state.checkoutValue}
                        </Text>
                      }
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Kamar, tamu, dan bintang */}
              <View style={[gs.rowContainer, {width: "100%", marginTop: 3 + 5}]}>
                {/* Kamar section */}
                <View style={[ats.rowContainer, {paddingLeft: 3}]}>
                  <Icon
                  name={"bed"}
                  size={25}
                  color={Color.color2}
                  />
                  <View style={[ls.bubble, {marginLeft: 8, maxWidth: 100}]}>
                    <Picker
                    mode={"dropdown"}
                    selectedValue={this.state.bedValue}
                    onValueChange={(value) => this.setBedValue(value)}
                    style={{width:90, height: 18}}>
                      <Picker.Item label="Bed" value={null}/>
                      <Picker.Item label="1 bed" value={1}/>
                      <Picker.Item label="2 bed" value={2}/>
                      <Picker.Item label="3 bed" value={3}/>
                    </Picker>
                  </View>
                </View>
                {/* Tamu section */}
                <View style={[ats.rowContainer, {paddingLeft: 3, marginLeft: 3}]}>
                  <Icon
                  name={"users"}
                  size={25}
                  color={Color.color2}
                  />
                  <View style={[ls.bubble, {marginLeft: 8, maxWidth: 100}]}>
                    <Picker
                    mode={"dropdown"}
                    selectedValue={this.state.tamuValue}
                    onValueChange={(value) => this.setTamuValue(value)}
                    style={{width:100, height: 18}}>
                      <Picker.Item label="Tamu" value={null}/>
                      <Picker.Item label="1 tamu" value={1}/>
                      <Picker.Item label="2 tamu" value={2}/>
                      <Picker.Item label="3 tamu" value={3}/>
                    </Picker>
                  </View>
                </View>
                {/* Bintang */}
                <View style={[ats.rowContainer, {paddingLeft: 3, marginLeft: 3,
                marginTop: 18}]}>
                  <Icon
                  name={"star"}
                  size={25}
                  color={Color.color2}
                  />
                  <View style={[ls.bubble, {marginLeft: 8}]}>
                    <Picker
                    mode={"dropdown"}
                    selectedValue={this.state.starValue}
                    onValueChange={(value) => this.setStarValue(value)}
                    style={{width:150, height: 18}}>
                      <Picker.Item label="Bintang" value={null}/>
                      <Picker.Item label="1 Bintang" value={1}/>
                      <Picker.Item label="2 Bintang" value={2}/>
                      <Picker.Item label="3 Bintang" value={3}/>
                      <Picker.Item label="4 Bintang" value={4}/>
                      <Picker.Item label="5 Bintang" value={5}/>
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* REKOMENDASI */}


        </View>
      </ScrollView>
    )
  }
}

const ls = StyleSheet.create({
  searchContainer: {
    // backgroundColor: "grey",
    width: "100%"
  },
  textInput: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 4,
    paddingLeft: 10,
    backgroundColor: Color.color1,
    borderRadius: 5
  },
  bubble: {
    textAlign: "left",
    textAlignVertical: "center",
    padding: 9,
    paddingLeft: 10,
    backgroundColor: Color.color1,
    borderRadius: 5
  },
  smallIcons: {
    height: 35,
    width: 35,
    marginRight: 5
  }
})

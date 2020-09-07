import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {ticketStyling as ts} from '../../style/ticket-styling';
import Color from '../../style/color.json';

// Data
import JumlahTicket from '../../data-dummy/attraction-data/jumlah-ticket.json';

export default class PaymentTicket extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      RESERVE_DATA: props.route.params,
      adultPrice: 0,
      childPrice: 0,
      totalPrice: 0,
      eWalletFlag: false,
      transferBankFlag: false,
      paySuccessAlert: false,
      payFailedAlert: false,
    });
  }

  UNSAFE_componentWillMount = () => {
    this.fetchPrice();
  }

  fetchPrice = () => {
    const adultPrice = this.state.RESERVE_DATA.adultTickets * JumlahTicket.data.harga_dewasa;
    const childPrice = this.state.RESERVE_DATA.childTickets * JumlahTicket.data.harga_anak;
    this.setState({
      adultPrice: adultPrice,
      childPrice: childPrice,
      totalPrice: adultPrice + childPrice
    })
  }

  eWalletChosen = () => {
    this.setState({
      eWalletFlag: true,
      transferBankFlag: false
    })
  }

  transferBankChosen = () => {
    this.setState({
      eWalletFlag: false,
      transferBankFlag: true
    })
  }

  pay = () => {
    const ewFlag = this.state.eWalletFlag;
    const transferFlag = this.state.transferBankFlag;
    console.log(transferFlag);
    console.log(ewFlag);
    if (ewFlag === true || transferFlag === true) {
      this.setState({paySuccessAlert: true})
    } else {
      this.setState({payFailedAlert: true})
    }
  }

  render() {
    return (
      <View style={gs.mainContainer}>
        {/* Modal berhasil bayar */}
        <Modal
        transparent={true}
        visible={this.state.paySuccessAlert}
        animationType="slide">
          <View style={gs.columnContainer}>
            <View style={ts.modalContainer}>
              <Icon name={'check-circle-o'} size={80} color={Color.color2} />
              <Text style={ts.alertMessage}>Payment Success!</Text>
              <TouchableOpacity style={ts.okButton}
                onPress={() => {
                  this.setState({paySuccessAlert: false});
                  this.props.navigation.navigate("Objek Wisata dan Destinasi")
                }}>
                  <Text style={[ts.title, {color: "white"}]}>OK</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal gagal bayar */}
        <Modal
        transparent={true}
        visible={this.state.payFailedAlert}
        animationType="slide">
          <View style={gs.columnContainer}>
            <View style={ts.modalContainer}>
              <Icon name={'times-circle'} size={80} color={"red"} />
              <Text style={ts.alertMessage}>Pilih metode pembayaran</Text>
              <TouchableOpacity style={ts.okButton}
                onPress={() => this.setState({payFailedAlert: false}) }>
                  <Text style={[ts.title, {color: "white"}]}>Tutup</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={{marginBottom: 30, fontWeight: "bold", fontSize: 30}}>Order Payment</Text>
        <View style={gs.cardSection}>
          {/* Title */}
          <Text style={ts.title} > {this.state.RESERVE_DATA.place_name} </Text>
          <Text> {this.state.RESERVE_DATA.city_name} </Text>

          {/* Payment details */}
          <View style={gs.columnContainer, {width: "100%"}}>
            {/* Upper side */}
            <View style={ls.rowDetail}>
              <View style={{marginBottom: 20}}>
                <Text style={ls.detailFont}>{this.state.RESERVE_DATA.chosenDate}</Text>
                <Text style={ls.detailFont}>{this.state.RESERVE_DATA.chosenTicket}</Text>
              </View>
            </View>

            {/* Lower side */}
            <View style={ls.rowDetail}>
              {/* Left side */}
              <View style={ls.columnDetail}>
                <Text style={ls.detailFont}>Dewasa x {this.state.RESERVE_DATA.adultTickets}</Text>
                <Text style={ls.detailFont}>Anak x {this.state.RESERVE_DATA.childTickets}</Text>
              </View>
              {/* Right side */}
              <View style={ls.columnDetail}>
                <Text style={ls.detailFont}>Rp{this.state.adultPrice}</Text>
                <Text style={ls.detailFont}>Rp{this.state.childPrice}</Text>
              </View>
            </View>
          </View>
          {/* Lower side */}
          <View style={[ls.rowDetail, {borderTopWidth: 1}]}>
            <View style={ls.columnDetail}></View>
            {/* Right side */}
            <View style={ls.columnDetail}>
              <Text style={ls.detailFont}>Rp{this.state.totalPrice}</Text>
            </View>
          </View>
          {/* Payment method */}
          <View>
            <Text>Metode pembayaran</Text>
            <View style={[ls.rowDetail,{alignItems: "center"}]}>
              <CheckBox
              value={this.state.transferBankFlag}
              onValueChange={() => this.transferBankChosen()}/>
              <Text>Transfer Bank</Text>
            </View>
            <View style={[ls.rowDetail,{alignItems: "center"}]}>
              <CheckBox
              value={this.state.eWalletFlag}
              onValueChange={() => this.eWalletChosen()}/>
              <Text>E-Wallet</Text>
            </View>
          </View>

          {/* Pay button */}
          <View style={[gs.columnContainer, {marginTop: 20}]}>
            <TouchableOpacity onPress={() => this.pay()} style={ts.pesanButton}>
              <Text style={{fontWeight: "bold", color: "white"}} >Bayar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const ls = StyleSheet.create({
  rowDetail: {
    flex: 0,
    flexDirection: "row",
    marginTop: 10
  },
  columnDetail: {
    flex: 0,
    flexDirection: "column",
    minWidth: "50%",
  },
  detailFont: {
    fontSize: 17
  }
})
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {ticketStyling as ts} from '../../style/ticket-styling';
import Color from '../../style/color.json';

// Data
import JumlahTicket from '../../data-dummy/attraction-data/jumlah-ticket.json';

export default class AccomodationPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RESERVE_DATA: props.route.params,
      eWalletFlag: false,
      transferBankFlag: false,
      paySuccessAlert: false,
      payFailedAlert: false,
    };
  }

  UNSAFE_componentWillMount = () => {};

  eWalletChosen = () => {
    this.setState({
      eWalletFlag: true,
      transferBankFlag: false,
    });
  };

  transferBankChosen = () => {
    this.setState({
      eWalletFlag: false,
      transferBankFlag: true,
    });
  };

  pay = () => {
    const ewFlag = this.state.eWalletFlag;
    const transferFlag = this.state.transferBankFlag;
    console.log(transferFlag);
    console.log(ewFlag);
    if (ewFlag === true || transferFlag === true) {
      this.setState({paySuccessAlert: true});
    } else {
      this.setState({payFailedAlert: true});
    }
  };

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
              <TouchableOpacity
                style={ts.okButton}
                onPress={() => {
                  this.setState({paySuccessAlert: false});
                  this.props.navigation.navigate('Accomodation');
                }}>
                <Text style={[ts.title, {color: 'white'}]}>OK</Text>
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
              <Icon name={'times-circle'} size={80} color={'red'} />
              <Text style={ts.alertMessage}>Pilih metode pembayaran</Text>
              <TouchableOpacity
                style={ts.okButton}
                onPress={() => this.setState({payFailedAlert: false})}>
                <Text style={[ts.title, {color: 'white'}]}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={{marginBottom: 30, fontWeight: 'bold', fontSize: 30}}>
          Order Payment
        </Text>
        <View style={gs.cardSection}>
          {/* Title */}
          <Text style={ts.title}>
            {' '}
            {this.state.RESERVE_DATA.accomodationName}{' '}
          </Text>
          <Text> {this.state.RESERVE_DATA.accomodationPlace} </Text>

          {/* Payment details */}
          <View style={(gs.columnContainer, {width: '100%'})}>
            {/* Upper side */}
            <View style={ls.rowDetail}>
              <View style={{marginBottom: 20, marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>Check in</Text>
                  <Text>:</Text>
                  <Text style={{marginLeft: 6}}>16 April 2020</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>Check out</Text>
                  <Text>:</Text>
                  <Text style={{marginLeft: 6}}>18 April 2020</Text>
                </View>
              </View>
            </View>

            {/* Lower side */}
            <View style={[ls.rowDetail, {justifyContent: 'space-between'}]}>
              {/* Left side */}
              <View style={ls.columnDetail}>
                <Text style={ls.detailFont}>
                  1 x {this.state.RESERVE_DATA.room.category} (2 malam)
                </Text>
              </View>
              {/* Right side */}
              <View style={ls.columnDetail}>
                <Text style={ls.detailFont}>
                  Rp{this.state.RESERVE_DATA.room.price}
                </Text>
              </View>
            </View>
          </View>
          {/* Lower side */}
          <View style={[ls.rowDetail, {borderTopWidth: 1}]}>
            <View style={ls.columnDetail}></View>
            {/* Right side */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                width: '100%',
              }}>
              <View style={ls.columnDetail}>
                <Text style={ls.detailFont}>
                  Rp{this.state.RESERVE_DATA.room.price}
                </Text>
              </View>
            </View>
          </View>
          {/* Payment method */}
          <View>
            <Text>Metode pembayaran</Text>
            <View style={[ls.rowDetail, {alignItems: 'center'}]}>
              <CheckBox
                value={this.state.transferBankFlag}
                onValueChange={() => this.transferBankChosen()}
              />
              <Text>Transfer Bank</Text>
            </View>
            <View style={[ls.rowDetail, {alignItems: 'center'}]}>
              <CheckBox
                value={this.state.eWalletFlag}
                onValueChange={() => this.eWalletChosen()}
              />
              <Text>E-Wallet</Text>
            </View>
          </View>

          {/* Pay button */}
          <View style={[gs.columnContainer, {marginTop: 20}]}>
            <TouchableOpacity onPress={() => this.pay()} style={ts.pesanButton}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Bayar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const ls = StyleSheet.create({
  rowDetail: {
    flexDirection: 'row',
    marginTop: 10,
  },
  columnDetail: {
    flex: 0,
    flexDirection: 'column',
  },
  detailFont: {
    fontSize: 16,
  },
});

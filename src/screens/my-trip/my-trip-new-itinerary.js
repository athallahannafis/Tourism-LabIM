import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity, Modal} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {myTripStyling as mts} from '../../style/my-trip-styling';
import {ticketStyling as ts} from '../../style/ticket-styling';

//adition
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class MyTripNewItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveItineraryPopUp: false,
      namaItinerary: "",
      alertPopUp: false,
      alertMessage: "",
    };
  }

  UNSAFE_componentWillMount = () => {};

  saveNewItinerary = () => {
    if (this.state.namaItinerary == ''){
      this.setState({
        alertMessage: "Nama itinerary belum diisi",
        alertPopUp : true})
    }
    else {
      this.setState({saveItineraryPopUp: false})
      this.props.navigation.navigate("Itinerary", {nama: this.state.namaItinerary})
    }
  }

  render() {
    return (
      <ScrollView>
        <Modal transparent={true} visible={this.state.saveItineraryPopUp}>
          <View style={ats.modalOverlay}>
            <View style={[ats.modal2Container, {alignItems:'flex-start'}]}>
                <Text style={ats.textMediumBoldColor4AlignCenter}>
                  Simpan itinerary dengan nama:
                </Text>
                <TextInput
                      style={[mts.textInput, {width: '50%', marginLeft: 10}]}
                      placeholder={'Nama Itinerary'}
                      onChangeText={(value) =>
                        this.setState({namaItinerary: value})
                      }
                />
              
              <View style={{flexDirection:'row',alignItems:'center', width: '100%', justifyContent:'flex-end'}}>
              
                <TouchableOpacity
                  style={[ats.btn, {marginRight:10, backgroundColor:'white'}]}
                  onPress={() => {
                    this.setState({
                      saveItineraryPopUp: false,
                    });
                  }}>
                  <Text style={[ats.btnText, {color: 'black', fontWeight:'normal'}]}> Batalkan </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={ats.btn}
                  onPress={() => this.saveNewItinerary()}>
                  <Text style={ats.btnText}> Simpan </Text>
                </TouchableOpacity>
              </View>
              </View>
              
          </View>
        </Modal>

        <Modal
            transparent={true}
            visible={this.state.alertPopUp}
            animationType="slide">
            <View style={gs.columnContainer}>
              <View style={ts.modalContainer}>
                <Icon name={'times-circle'} size={80} color={'red'} />
                <Text style={[ts.alertMessage]}>{this.state.alertMessage}</Text>
                <TouchableOpacity
                  style={ts.okButton}
                  onPress={() => this.setState({alertPopUp: false})}>
                  <Text style={[ts.title, {color: 'white'}]}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <DateTimePicker
            isVisible={this.state.checkinVisible}
            onCancel={this.hideDate}
            onConfirm={this.handleCheckin}
          />

        <View style={[gs.mainContainer, {justifyContent: 'flex-start', minHeight: Dimensions.get('window').height}]}>
          <View
            style={{alignItems: 'flex-end', width: '100%', marginBottom: 30}}>
            <TouchableOpacity
              onPress={()=>this.setState({saveItineraryPopUp:true})}
              style={[ts.pesanButton, {borderRadius: 5, marginRight: 30}]}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Simpan</Text>
            </TouchableOpacity>
          </View>

          <View style={[ats.searchBoxContainer]}>
            <View style={ats.searchBox}>
              <TextInput
                autoCorrect={false}
                style={ats.searchBoxTextInput}
                placeholder={'Tujuan objek wisata'}
                onChangeText={this.changeText}
                onEndEditing={this.handleSearch}
                ref={(input) => {
                  this.state.search = input;
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  'Attraction Search Results',
                  this.state.search,
                )
              }>
              <Icon
                style={{marginRight: 5}}
                name={'search'}
                size={18}
                color={Color.color2}
              />
            </TouchableOpacity>
          </View>

          <View style={[gs.cardSection, {marginTop: 10}]}>
            <Text style={gs.cardTitle}>Isi Itinerary-mu:</Text>
            {/*Destinasi pertama */}
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: Color.color3,
                height: 175,
                marginBottom: 12,
              }}>
              <View style={{width:'100%', alignItems:'flex-end'}}>
                    <Icon
                      style={{marginRight:5, marginTop:5}}
                      name={'times-circle'}
                      size={20}
                      color={Color.color4}
                    />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 10,
                }}>
                <Image
                  style={[mts.squareImage, {}]}
                  source={{
                    uri:
                      'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                    width: 190,
                  }}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    Pura Gunung Kawi
                  </Text>
                  <Text style={{fontSize: 12, marginTop: 5}}>
                    Candi Tebing Kawi adalah situs purbakala yang dilindungi di
                    Bali. Terletak di Sungai Pakerisan
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      style={{marginRight: 5}}
                      name={'clock-o'}
                      size={16}
                      color={'black'}
                    />
                    <Text style={{fontSize: 10}}>4-6 Hari</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      style={{marginRight: 5}}
                      name={'money'}
                      size={16}
                      color={'black'}
                    />
                    <Text style={{fontSize: 10}}>600.000 - 800.000</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

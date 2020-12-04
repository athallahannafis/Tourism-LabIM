import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity, Modal} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

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

//data
import Attraction from '../../data-dummy/attraction-data/attraction.json';

export default class MyTripNewItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveItineraryPopUp: false,
      namaItinerary: "",
      alertPopUp: false,
      alertMessage: "",
      destinationName: props.route.params.destinationName,
      passAttraction: props.route.params.passAttraction,
      attraction: props.route.params.attraction,
      thisTripData: [],
      search: '',
    };
  }

  UNSAFE_componentWillMount = () => {
    console.log("HAHA")
    console.log(this.state.passAttraction);
    console.log("HUHU")
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log(this.state.passAttraction);
    if (this.state.passAttraction !== prevState.passAttraction){
      console.log("masuk siniiii")
      this.fetchData(this.state.passAttraction);
    }
  }

  saveNewItinerary = () => {
    if (this.state.namaItinerary == ''){
      this.setState({
        alertMessage: "Nama itinerary belum diisi",
        alertPopUp : true})
    }
    else {
      if (this.props.route.params.passAttraction){
          this.setState({saveItineraryPopUp: false})
          console.log("sudah masuk sini")
          this.props.navigation.navigate("Itinerary", {
          nama: this.state.namaItinerary, 
          destinationName: this.state.destinationName,
          price: 800000+parseInt((this.props.route.params.attraction.detail.ticket_price).substring(2, (this.props.route.params.attraction.detail.ticket_price).length - 2)),
          list_attractions: [
            {
            "city_name": "Bali",
            "place_name": "Pura Gunung Kawi",
            "description": "Candi Tebing Kawi adalah situs purbakala yang dilindungi di Bali. Terletak di Sungai Pakerisan",
            "image_source": "https://awsimages.detik.net.id/community/media/visual/2018/04/06/d9748234-a7bc-410f-a19f-9df51d3efd76.jpeg?w=700&q=90",
            "detail": {
              "ticket_price": "Rp600000,00",
            }
          },
            this.props.route.params.attraction],
        })
      }
      else {
        this.setState({saveItineraryPopUp: false})
          console.log("sudah masuk sono")
          this.props.navigation.navigate("Itinerary", {
          nama: this.state.namaItinerary, 
          destinationName: this.state.destinationName,
          price: 600000,
          list_attractions: [
            {
            "city_name": "Bali",
            "place_name": "Pura Gunung Kawi",
            "description": "Candi Tebing Kawi adalah situs purbakala yang dilindungi di Bali. Terletak di Sungai Pakerisan",
            "image_source": "https://awsimages.detik.net.id/community/media/visual/2018/04/06/d9748234-a7bc-410f-a19f-9df51d3efd76.jpeg?w=700&q=90",
            "detail": {
              "ticket_price": "Rp600000,00",
            }
          }],
        })
      }
      
    }
  }

  changeText = (search) => {
    this.setState({search: search});
  };

  handleSearch = (e) => {
    this.state.search.clear();
    this.setState({search: ''});
    this.props.navigation.navigate(
      'Hasil pencarian untuk Itinerary',
      {key: e.nativeEvent.text,
      destinationName: this.state.destinationName}
    );
  };

  render() {
    console.log("heheheheh")
    console.log(this.props.route.params.passAttraction);
    console.log("heheheh")
    return (
      <ScrollView>
        <Modal transparent={true} visible={this.state.saveItineraryPopUp}>
          <View style={ats.modalOverlay}>
            <View style={[ats.modal2Container, {alignItems:'flex-start'}]}>
                <Text style={ats.textMediumBoldColor4AlignCenter}>
                  Simpan itinerary dengan nama:
                </Text>
                <TextInput
                      style={[mts.textInput, {width: '50%', marginLeft: hp(1.5)}]}
                      autoCorrect={false}
                      placeholder={'Nama Itinerary'}
                      onChangeText={(value) => {this.setState({namaItinerary: value})}}
                />
              
              <View style={{flexDirection:'row',alignItems:'center', width: '100%', justifyContent:'flex-end'}}>
              
                <TouchableOpacity
                  style={[ats.btn, {marginRight:hp(1.5), backgroundColor:'white'}]}
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
                <Icon name={'times-circle'} size={hp(8)} color={'red'} />
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
          {this.props.route.params.passAttraction ? (
            <View style={[gs.mainContainer, {justifyContent: 'flex-start', minHeight: Dimensions.get('window').height}]}>
            <View
              style={{alignItems: 'flex-end', width: '100%', marginBottom: hp(4.5)}}>
              <TouchableOpacity
                onPress={()=>this.setState({saveItineraryPopUp:true})}
                style={[ts.pesanButton, {borderRadius: hp(1), marginRight: hp(3)}]}>
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
                  style={{marginRight: hp(1)}}
                  name={'search'}
                  size={hp(2.5)}
                  color={Color.color2}
                />
              </TouchableOpacity>
            </View>
  
            <View style={[gs.cardSection, {marginTop: hp(2)}]}>
              <Text style={gs.cardTitle}>Isi Itinerary-mu:</Text>
              {/*Destinasi pertama */}
              <TouchableOpacity
                style={{
                  borderRadius: hp(2),
                  backgroundColor: Color.color3,
                  height: hp(20),
                  padding: hp(1.5),
                  marginBottom: hp(2),
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    margin: hp(1.5),
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
                      marginLeft: hp(1.5),
                      width: hp(23),
                    }}>
                    <Text style={{fontSize: hp(2.2), fontWeight: 'bold'}}>
                      Pura Gunung Kawi
                    </Text>
                    <Text style={{fontSize: hp(1.6), marginTop: hp(1)}}>
                      Candi Tebing Kawi adalah situs purbakala yang dilindungi di
                      Bali. Terletak di Sungai Pakerisan
                    </Text>

                    <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                      <Icon
                        style={{marginRight: hp(1)}}
                        name={'money'}
                        size={hp(2.5)}
                        color={'black'}
                      />
                      <Text style={{fontSize: hp(1.5)}}>600.000 - 800.000</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {/*Destinasi kedua */}
              <TouchableOpacity
                style={{
                  borderRadius: hp(2),
                  backgroundColor: Color.color3,
                  height: hp(20),
                  padding: hp(1.5),
                  marginBottom: hp(2),
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    margin: hp(1.5),
                  }}>
                  <Image
                    style={[mts.squareImage, {}]}
                    source={{
                      uri:
                        this.props.route.params.attraction.image_source,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft:hp(1.5),
                      width: hp(23),
                    }}>
                    <Text style={{fontSize: hp(2.2), fontWeight: 'bold'}}>
                      {this.props.route.params.attraction.place_name}
                    </Text>
                    <Text style={{fontSize: 12, marginTop: hp(1)}}>
                      {this.props.route.params.attraction.description}
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                      <Icon
                        style={{marginRight: hp(1)}}
                        name={'money'}
                        size={hp(2.5)}
                        color={'black'}
                      />
                      <Text style={{fontSize: hp(1.5)}}>{this.props.route.params.attraction.detail.ticket_price} /orang</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          ) : (
            <View style={[gs.mainContainer, {justifyContent: 'flex-start', minHeight: Dimensions.get('window').height}]}>
          <View
            style={{alignItems: 'flex-end', width: '100%', marginBottom: hp(4)}}>
            <TouchableOpacity
              onPress={()=>this.setState({saveItineraryPopUp:true})}
              style={[ts.pesanButton, {borderRadius: hp(1), marginRight: hp(4)}]}>
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
                style={{marginRight: hp(1)}}
                name={'search'}
                size={hp(2.5)}
                color={Color.color2}
              />
            </TouchableOpacity>
          </View>

          <View style={[gs.cardSection, {marginTop: hp(1.5)}]}>
            <Text style={gs.cardTitle}>Isi Itinerary-mu:</Text>
            {/*Destinasi pertama */}
            <TouchableOpacity
              style={{
                borderRadius: hp(2),
                  backgroundColor: Color.color3,
                  height: hp(20),
                  padding: hp(1.5),
                  marginBottom: hp(2),
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: hp(1.5),
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
                    marginLeft: hp(1.5),
                    width: hp(23),
                  }}>
                  <Text style={{fontSize: RFPercentage(2.3), fontWeight: 'bold'}}>
                    Pura Gunung Kawi
                  </Text>
                  <Text style={{fontSize: RFPercentage(1.6), marginTop: hp(1)}}>
                    Candi Tebing Kawi adalah situs purbakala yang dilindungi di
                    Bali. Terletak di Sungai Pakerisan
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'money'}
                      size={hp(2.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.5)}}>600.000 - 800.000</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
          )}
      </ScrollView>
    );
  }
}

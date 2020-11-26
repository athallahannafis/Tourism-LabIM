import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-community/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

// style
import Color from '../../style/color.json';
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {accomodationStyling as acs} from '../../style/accomodation-styling';
import Slider from '@react-native-community/slider';

// data
import AccomodationData from '../../data-dummy/accomodation-data/accomodation.json';
import StarRating from 'react-native-star-rating';

export default class AccomodationHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedData: props.route.params,
      simpleSearchedInfo: true,
      list: [],
    };
  }
  UNSAFE_componentWillMount = () => {
    this.fetchResult();
  };

  fetchResult = () => {
    const searched = this.state.searchedData;
    const nameValue = String(searched.name).toLowerCase();

    //Jika keyword bagian dari nama akomodasi
    //Prioritas Satu
    for (let i = 0; i < AccomodationData.data.length; i++) {
      if (
        AccomodationData.data[i].accomodation_name
          .toLowerCase()
          .includes(nameValue)
      ) {
        if (!this.state.list.includes(AccomodationData.data[i])) {
          this.state.list.push(AccomodationData.data[i]);
        }
      }
    }

    //Jika keyword bagian dari kota/daerah dimana akomodasi tersebut berada
    //Prioritas Dua
    for (let i = 0; i < AccomodationData.data.length; i++) {
      if (
        AccomodationData.data[i].accomodation_place
          .toLowerCase()
          .includes(nameValue)
      ) {
        if (!this.state.list.includes(AccomodationData.data[i])) {
          this.state.list.push(AccomodationData.data[i]);
        }
      }
    }

    //Jika keyword bagian dari deskripsi akomodasi
    //Prioritas Tiga
    for (let i = 0; i < AccomodationData.data.length; i++) {
      if (
        AccomodationData.data[i].description.toLowerCase().includes(nameValue)
      ) {
        if (!this.state.list.includes(AccomodationData.data[i])) {
          this.state.list.push(AccomodationData.data[i]);
        }
      }
    }

    var j = this.state.list.length;
    while (j--) {
      //Filter berdasarkan harga /kamar/malam mulai dari Rp.x (nilai slider)
      if (searched.price > this.state.list[j].details.price) {
        this.state.list.splice(j, 1);
      } else {
        continue;
      }
      //Filter berdasarkan rate
      if (searched.star == 1 && this.state.list[j].rate >= 2) {
        this.state.list.splice(j, 1);
      } else if (
        searched.star == 2 &&
        (this.state.list[j].rate < 2 || this.state.list[j].rate >= 3)
      ) {
        this.state.list.splice(j, 1);
      } else if (
        searched.star == 3 &&
        (this.state.list[j].rate < 3 || this.state.list[j].rate >= 4)
      ) {
        this.state.list.splice(j, 1);
      } else if (
        searched.star == 4 &&
        (this.state.list[j].rate < 4 || this.state.list[j].rate >= 5)
      ) {
        this.state.list.splice(j, 1);
      } else if (searched.star == 5 && this.state.list[j].rate < 5) {
        this.state.list.splice(j, 1);
      } else {
        console.log('masuk sini');
      }
    }
  };

  render() {
    const result = this.state.list.map((item) => {
      return (
        <>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Accomodation Details', {
                acc: item,
                date_exist: true,
                user_order: this.state.searchedData,
              })
            }
            style={[gs.rowContainerNoWrap, {paddingVertical: 20}]}>
            {/* left section */}
            <View style={{width: wp(40)}}>
              <Image
                source={{uri: item.images_source[0]}}
                style={gs.smallImage}
              />
            </View>

            {/* Right Section */}
            <View style={{width: wp(40)}}>
              <Text style={gs.subCardTitle}>{item.accomodation_name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name={'map-marker'} size={hp(1.5)} style={{marginRight: 2}} />
                <Text style={acs.smallCardText}>{item.accomodation_place}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 2,
                  alignItems: 'center',
                }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={item.rate}
                  fullStarColor={Color.color6}
                  starSize={hp(1.5)}
                />
                <Text
                  style={[
                    acs.smallCardText,
                    {fontWeight: 'bold', marginLeft: 4},
                  ]}>
                  {item.rate}
                </Text>
                <Text style={[acs.smallCardText, {marginLeft: 4}]}>
                  ({item.reviews.length} reviews)
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={acs.smallCardText}>Mulai dari </Text>
                <Text style={{fontWeight: 'bold', fontSize: RFPercentage(1.7)}}>
                  Rp. {item.details.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </>
      );
    });
    return (
      <>
        {this.state.simpleSearchedInfo ? (
          <ScrollView>
            <View
              style={[
                gs.mainContainer,
                {
                  height: Dimensions.get('window').height - 80,
                  justifyContent: 'flex-start',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '90%',
                  marginBottom: 15,
                }}>
                <Text style={{fontSize: RFPercentage(1.7)}}>Hasil untuk</Text>
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.7)}}>
                  {' '}
                  akomodasi di sekitar anda
                </Text>
              </View>
              <View
                style={[
                  gs.cardSection,
                  {
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={acs.segmentOfCardInSearchResult}>
                    <Text style={{fontSize: RFPercentage(1.6)}}>
                      {this.state.searchedData.checkIn}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '70%',
                    }}>
                    <View style={acs.segmentOfCardInSearchResult}>
                      <Text style={{fontSize: RFPercentage(1.6)}}>
                        {this.state.searchedData.stayPeriod} Malam
                      </Text>
                    </View>
                    <View style={acs.segmentOfCardInSearchResult}>
                      <Text style={{fontSize: RFPercentage(1.6)}}>
                        {this.state.searchedData.bed} Kamar
                      </Text>
                    </View>
                    <View style={acs.segmentOfCardInSearchResult}>
                      <Text style={{fontSize: RFPercentage(1.6)}}>
                        {this.state.searchedData.guest} Tamu
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '15%',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            simpleSearchedInfo: false,
                          })
                        }>
                        <Icon name={'chevron-down'} size={hp(2.5)} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  gs.cardSection
                ]}>
                <Text style={gs.cardTitle}>Akomodasi</Text>

                {result}
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View
              style={[
                gs.mainContainer,
                {
                  flex: 1,
                  justifyContent: 'flex-start',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '90%',
                  marginBottom: 15,
                }}>
                <Text>Hasil untuk</Text>
                <Text style={{fontWeight: 'bold'}}>
                  {' '}
                  akomodasi di sekitar anda
                </Text>
              </View>
              <View
                style={[
                  gs.cardSection]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center"
                  }}>
                  <Text style={[gs.cardTitle]}>
                    Cari lagi
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        simpleSearchedInfo: true,
                      })
                    }>
                    <Icon name={'chevron-up'} size={hp(2.5)} />
                  </TouchableOpacity>
                </View>

                <View style={[ls.searchContainer]}>
                  {/* Akomodasi sekitar anda */}
                  <View style={[ats.rowContainer, {width: '100%'}]}>
                    <Icon
                      name={'map-marker'}
                      size={hp(4)}
                      color={Color.color6}
                      style={{marginLeft: 7}}
                    />
                    <TextInput
                      style={[ls.textInput, {width: '85%', marginLeft: 18,
                      paddingVertical: "3%"}]}
                      placeholder={'Akomodasi di sekitar anda...'}
                      onChangeText={(value) => this.setState({nameValue: value})}
                    />
                  </View>

                  {/* Checkin dan checkout */}
                  <View
                    style={[ats.rowContainer, {width: '100%', marginTop: 8}]}>
                    <View style={ats.rowContainer}>
                      <View style={ats.rowContainer}>
                        <Icon
                          name={'calendar'}
                          size={hp(4)}
                          color={Color.color6}
                          style={{marginLeft: 3}}
                        />
                        {/* Checkin */}
                        <TouchableOpacity
                          style={[ls.bubble, {marginLeft: 14}]}
                          onPress={() => this.showCheckin()}>
                          <Text
                            style={{fontSize: RFPercentage(1.4),
                            color: 'black', width: "100%"}}>
                            {this.state.searchedData.checkIn}
                          </Text>
                        </TouchableOpacity>
                        {/* Checkout */}
                        <TouchableOpacity
                          style={[ls.bubble, {marginLeft: 26}]}
                          onPress={() => this.showCheckout()}>
                          <Text
                            style={{fontSize: RFPercentage(1.4),
                            color: 'black', width: "100%"}}>
                            {this.state.searchedData.checkOut}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Kamar, tamu, dan bintang */}
                  <View
                    style={[
                      {
                        flex: 0,
                        flexDirection: "column",
                        width: "100%"
                      },
                    ]}>
                    {/* Kamar section */}
                    <View
                      style={[
                        ats.rowContainer, {paddingLeft: 3}
                      ]}>
                      <Icon name={'bed'} size={hp(4)} color={Color.color6} />
                      <View style={[ls.bubble, {marginLeft: 8, marginTop: 8}]}>
                        <Picker
                          mode={'dropdown'}
                          selectedValue={this.state.searchedData.bed}
                          onValueChange={(value) => this.setBedValue(value)}
                          style={{height: 20, scaleX: 0.6, scaleY: 0.6}}>
                          <Picker.Item label="Bed" value={null} />
                          <Picker.Item label="1 bed" value={1} />
                          <Picker.Item label="2 bed" value={2} />
                          <Picker.Item label="3 bed" value={3} />
                        </Picker>
                      </View>
                    </View>
                    {/* Tamu section */}
                    <View
                      style={[
                        ats.rowContainer, {paddingLeft: 3},
                      ]}>
                      <Icon name={'users'} size={hp(4)} color={Color.color6} />
                      <View style={[ls.bubble, {marginLeft: 8, marginTop: 8}]}>
                        <Picker
                          mode={'dropdown'}
                          selectedValue={this.state.searchedData.guest}
                          onValueChange={(value) => this.setTamuValue(value)}
                          style={{height: 20, scaleX: 0.6, scaleY: 0.6}}>
                          <Picker.Item label="Tamu" value={null} />
                          <Picker.Item label="1 tamu" value={1} />
                          <Picker.Item label="2 tamu" value={2} />
                          <Picker.Item label="3 tamu" value={3} />
                        </Picker>
                      </View>
                    </View>
                    {/* Bintang */}
                    <View
                      style={[
                        ats.rowContainer, {paddingLeft: 3},
                      ]}>
                      <Icon name={'star'} size={hp(4)} color={Color.color6} />
                      <View style={[ls.bubble, {marginLeft: 10}]}>
                        <Picker
                          mode={'dropdown'}
                          selectedValue={this.state.searchedData.star}
                          onValueChange={(value) => this.setStarValue(value)}
                          style={{height: 20, scaleX: 0.6, scaleY: 0.6}}>
                          <Picker.Item label="Bintang" value={null} />
                          <Picker.Item label="1 Bintang" value={1} />
                          <Picker.Item label="2 Bintang" value={2} />
                          <Picker.Item label="3 Bintang" value={3} />
                          <Picker.Item label="4 Bintang" value={4} />
                          <Picker.Item label="5 Bintang" value={5} />
                        </Picker>
                      </View>
                    </View>
                  </View>
                  {/* Price Slider */}
                  <View style={acs.sliderContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: RFPercentage(1.4),
                          marginRight: 5,
                        }}>
                        Cari harga /kamar/malam :
                      </Text>
                      <Text style={{fontSize: RFPercentage(1.4)}}>
                        Rp.{this.state.searchedData.price}
                      </Text>
                    </View>

                    <View style={{marginTop: 5}}>
                      <Slider
                        maximumValue={20000000}
                        minimumValue={0}
                        thumbTintColor={Color.color6}
                        minimumTrackTintColor={Color.color6}
                        maximumTrackTintColor="#000000"
                        step={100000}
                        value={this.state.searchedData.price}
                        onValueChange={(sliderValue) =>
                          this.setState({sliderValue: sliderValue})
                        }
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{fontSize: RFPercentage(2.0)}}>
                          Rp 0
                        </Text>
                        <Text style={{fontSize: RFPercentage(2.0)}}>
                          Rp 20.000.000+
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={acs.pilihButton}
                      onPress={() => this.search()}>
                      <Text style={{
                      color: Color.white,
                      fontWeight: 'bold',
                      fontSize: RFPercentage(2.0)}}>
                        Cari
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={[
                  gs.cardSection,
                  {marginTop: 10}
                ]}>
                <Text style={gs.cardTitle}>Akomodasi</Text>
                {result}
              </View>
            </View>
          </ScrollView>
        )}
      </>
    );
  }
}
const ls = StyleSheet.create({
  searchContainer: {
    // backgroundColor: "grey",
    width: '100%',
  },
  textInput: {
    fontSize: RFPercentage(1.4),
    color: 'black',
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 4,
    paddingLeft: 10,
    borderWidth: 0.8,
    borderColor: Color.color6,
    backgroundColor: '#fff',
    borderRadius: 1000,
  },
  bubble: {
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 9,
    paddingLeft: 10,
    borderWidth: 0.8,
    borderColor: Color.color6,
    backgroundColor: '#fff',
    borderRadius: 1000,
    width: "37%"
  },
  smallIcons: {
    height: 35,
    width: 35,
    marginRight: 5,
  },
});

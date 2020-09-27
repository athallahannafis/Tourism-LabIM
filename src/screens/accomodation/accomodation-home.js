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
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';

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
      accDataSet: [],
      recommendedAcc: {},
      checkinVisible: false,
      checkoutVisible: false,
      bedValue: null,
      tamuValue: null,
      starValue: null,
      checkinValue: 'Tanggal check-in',
      checkoutValue: 'Tanggal check-out',
      sliderValue: 0,
    };
  }

  UNSAFE_componentWillMount = () => {
    this.fetchAccomodation();
    this.getBestAcc();
  };

  fetchAccomodation = () => {
    const temp = AccomodationData.data;
    this.state.accDataSet = temp;
  };

  getBestAcc = () => {
    const temp = AccomodationData.data;
    let best = temp[0];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].rate > best.rate) {
        best = temp[i];
      }
    }
    this.state.recommendedAcc = best;
    console.log(this.state.recommendedAcc);
  };

  handleCheckin = (date) => {
    this.setState({
      checkinVisible: false,
      checkinValue: moment(date).format('DD MMMM YYYY'),
    });
  };

  handleCheckout = (date) => {
    this.setState({
      checkoutVisible: false,
      checkoutValue: moment(date).format('DD MMMM YYYY'),
    });
  };

  showCheckin = () => {
    this.setState({checkinVisible: true});
  };

  showCheckout = () => {
    this.setState({checkoutVisible: true});
  };

  hideDate = () => {
    this.setState({checkinVisible: false, checkoutVisible: false});
  };

  setBedValue = (value) => {
    this.setState({bedValue: value});
  };

  setTamuValue = (value) => {
    this.setState({tamuValue: value});
  };

  setStarValue = (value) => {
    this.setState({starValue: value});
  };

  render() {
    const DATASET = this.state.accDataSet;
    const accList = DATASET.map((item) => {
      const last = DATASET.length - 1;
      if (item === DATASET[last]) {
        return (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Accomodation Details', item)
            }
            style={[gs.rowContainer, {paddingVertical: 20}]}>
            {/* left section */}
            <View style={{width: 180}}>
              <Image
                source={{uri: item.images_source[0]}}
                style={gs.smallImage}
              />
            </View>

            {/* Right Section */}
            <View style={{width: 180}}>
              <Text style={gs.subCardTitle}>{item.accomodation_name}</Text>
              <View style={ats.starRatingView}>
                <Text
                  style={[
                    ats.textSmall,
                    {color: Color.color6, marginLeft: 10},
                  ]}></Text>
              </View>
              <Text>{item.description}</Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Accomodation Details', item)
              }
              style={[gs.rowContainer, {paddingVertical: 20}]}>
              {/* left section */}
              <View style={{width: 180}}>
                <Image
                  source={{uri: item.images_source[0]}}
                  style={gs.smallImage}
                />
              </View>

              {/* Right Section */}
              <View style={{width: 180}}>
                <Text style={gs.subCardTitle}>{item.accomodation_name}</Text>
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
            <View style={{borderBottomWidth: 1, borderColor: Color.color1}} />
          </>
        );
      }
    });
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
              <View style={[ats.rowContainer, {width: '100%'}]}>
                {/* <Image style={ls.smallIcons}
                source={require('../../images/bottomtab-icons/objekWisata.png')}/> */}
                <Icon
                  name={'map-marker'}
                  size={25}
                  color={Color.color6}
                  style={{marginLeft: 7}}
                />
                <TextInput
                  style={[ls.textInput, {width: '85%', marginLeft: 18}]}
                  placeholder={'Akomodasi di sekitar anda...'}
                  onChangeText={(value) => this.setState({value})}
                />
              </View>

              {/* Checkin dan checkout */}
              <View style={[ats.rowContainer, {width: '100%', marginTop: 8}]}>
                <View style={ats.rowContainer}>
                  <View style={ats.rowContainer}>
                    {/* <Image style={ls.smallIcons}
                    source={require("../../images/ticket-icons/calendar.png")}/> */}
                    <Icon
                      name={'calendar'}
                      size={25}
                      color={Color.color6}
                      style={{marginLeft: 3}}
                    />
                    {/* Checkin */}
                    <TouchableOpacity
                      style={[ls.bubble, {marginLeft: 14}]}
                      onPress={() => this.showCheckin()}>
                      {this.state.checkinValue === 'Tanggal check-in' ? (
                        <Text style={{fontSize: 15, color: 'grey', width: 125}}>
                          {this.state.checkinValue}
                        </Text>
                      ) : (
                        <Text
                          style={{fontSize: 15, color: 'black', width: 125}}>
                          {this.state.checkinValue}
                        </Text>
                      )}
                    </TouchableOpacity>
                    {/* Checkout */}
                    <TouchableOpacity
                      style={[ls.bubble, {marginLeft: 26}]}
                      onPress={() => this.showCheckout()}>
                      {this.state.checkoutValue === 'Tanggal check-out' ? (
                        <Text style={{fontSize: 15, color: 'grey', width: 127}}>
                          {this.state.checkoutValue}
                        </Text>
                      ) : (
                        <Text
                          style={{fontSize: 15, color: 'black', width: 127}}>
                          {this.state.checkoutValue}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Kamar, tamu, dan bintang */}
              <View
                style={[
                  ats.rowContainer,
                  {
                    width: '100%',
                    marginTop: 3 + 5,
                    flexWrap: 'wrap',
                  },
                ]}>
                {/* Kamar section */}
                <View
                  style={[ats.rowContainer, {paddingLeft: 3, marginRight: 20}]}>
                  <Icon name={'bed'} size={25} color={Color.color6} />
                  <View style={[ls.bubble, {marginLeft: 8, maxWidth: 130}]}>
                    <Picker
                      mode={'dropdown'}
                      selectedValue={this.state.bedValue}
                      onValueChange={(value) => this.setBedValue(value)}
                      style={{width: 100, height: 18}}>
                      <Picker.Item label="Bed" value={null} />
                      <Picker.Item label="1 bed" value={1} />
                      <Picker.Item label="2 bed" value={2} />
                      <Picker.Item label="3 bed" value={3} />
                    </Picker>
                  </View>
                </View>
                {/* Tamu section */}
                <View
                  style={[ats.rowContainer, {paddingLeft: 3, marginLeft: 20}]}>
                  <Icon name={'users'} size={25} color={Color.color6} />
                  <View style={[ls.bubble, {marginLeft: 8, maxWidth: 130}]}>
                    <Picker
                      mode={'dropdown'}
                      selectedValue={this.state.tamuValue}
                      onValueChange={(value) => this.setTamuValue(value)}
                      style={{width: 100, height: 18}}>
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
                    ats.rowContainer,
                    {paddingLeft: 3, marginLeft: 3, marginTop: 18},
                  ]}>
                  <Icon name={'star'} size={25} color={Color.color6} />
                  <View style={[ls.bubble, {marginLeft: 10}]}>
                    <Picker
                      mode={'dropdown'}
                      selectedValue={this.state.starValue}
                      onValueChange={(value) => this.setStarValue(value)}
                      style={{width: 150, height: 18}}>
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
              <View style={acs.sliderContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 15, marginRight: 5}}>
                    Cari harga /kamar/malam :
                  </Text>
                  <Text>Rp.{this.state.sliderValue}</Text>
                </View>

                <View style={{marginTop: 5}}>
                  <Slider
                    maximumValue={20000000}
                    minimumValue={0}
                    thumbTintColor={Color.color6}
                    minimumTrackTintColor={Color.color6}
                    maximumTrackTintColor="#000000"
                    step={100000}
                    value={this.state.sliderValue}
                    onValueChange={(sliderValue) =>
                      this.setState({sliderValue: sliderValue})
                    }
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Rp 0</Text>
                    <Text>Rp 20.000.000+</Text>
                  </View>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={acs.pilihButton}>
                  <Text style={{color: Color.white, fontWeight: 'bold'}}>
                    Cari
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* RECOMMENDED SECTION */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Rekomendasi Akomodasi sekitar anda</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  'Accomodation Details',
                  this.state.recommendedAcc,
                )
              }
              style={gs.rowContainer}>
              {/* left section */}
              <View style={{width: 180}}>
                <Image
                  source={{uri: this.state.recommendedAcc.images_source[0]}}
                  style={gs.bigImage}
                />
              </View>

              {/* Right Section */}
              <View style={{width: 180}}>
                <Text style={gs.subCardTitle}>
                  {this.state.recommendedAcc.accomodation_name}
                </Text>
                <Text>{this.state.recommendedAcc.description}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Baru dilihat */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Baru dilihat</Text>
            {accList}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const ls = StyleSheet.create({
  searchContainer: {
    // backgroundColor: "grey",
    width: '100%',
  },
  textInput: {
    fontSize: 15,
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
  },
  smallIcons: {
    height: 35,
    width: 35,
    marginRight: 5,
  },
});

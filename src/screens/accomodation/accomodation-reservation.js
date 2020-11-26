import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {accomodationStyling as acs} from '../../style/accomodation-styling';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SliderBox} from 'react-native-image-slider-box';

export default class AccomodationReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      DATA: props.route.params.data,
      user_order: props.route.params.user_order,
    };
  }

  render() {
    console.log('=!=!=!=!');
    console.log(this.state.user_order);
    const rooms = this.state.DATA.rooms.map((item) => {
      if (item.breakfast === true) {
        return (
          <View style={[gs.cardSection, {marginTop: 10, marginBottom: 10}]}>
            <Text style={acs.subCardTitle}>{item.category}</Text>
            <View style={acs.mainImageinCardContainer}>
              <SliderBox
                images={item.room_images}
                parentWidth={Dimensions.get('window').width - 50}
                sliderBoxHeight={hp(40)}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Icon
                name={'bed'}
                size={hp(1.8)}
                style={{paddingRight: 5, width: 20}}
              />
              <Text style={acs.smallCardText}>{item.room_details.bed}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Icon
                name={'user-alt'}
                size={hp(1.8)}
                style={{paddingRight: 5, width: 20}}
              />
              <Text style={acs.smallCardText}>{item.room_details.guest}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Icon
                name={'utensils'}
                size={hp(1.8)}
                style={{paddingRight: 5, width: 20}}
              />
              <Text style={acs.smallCardText}>Breakfast not included</Text>
            </View>
            {/*harga */}
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '100%',
              }}>
              <Text style={acs.subCardTitle}>Rp. {item.price}</Text>
              <Text style={{fontSize: RFPercentage(1.8)}}>/kamar/malam</Text>
              <TouchableOpacity
                style={acs.pilihButton}
                onPress={() =>
                  this.props.navigation.navigate('Accomodation Payment', {
                    accomodationName: this.state.DATA.accomodation_name,
                    accomodationPlace: this.state.DATA.accomodation_place,
                    room: item,
                    user_order: this.state.user_order,
                  })
                }>
                <Text
                  style={{
                    fontSize: RFPercentage(1.8),
                    fontWeight: 'bold',
                    color: "white"
                  }}>
                  Pilih
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <>
            <View style={[gs.cardSection, {marginTop: 10, marginBottom: 10}]}>
              <Text style={acs.subCardTitle}>{item.category}</Text>
              <View style={acs.mainImageinCardContainer}>
                <SliderBox
                  images={item.room_images}
                  parentWidth={Dimensions.get('window').width - 50}
                  sliderBoxHeight={hp(30)}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icon
                  name={'bed'}
                  size={hp(1.8)}
                  style={{paddingRight: 5, width: 20}}
                />
                <Text style={acs.smallCardText}>{item.room_details.bed}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icon
                  name={'user-alt'}
                  size={hp(1.8)}
                  style={{paddingRight: 5, width: 20}}
                />
                <Text style={acs.smallCardText}>{item.room_details.guest}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icon
                  name={'utensils'}
                  size={hp(1.8)}
                  style={{paddingRight: 5, width: 20}}
                />
                <Text style={acs.smallCardText}>Breakfast not included</Text>
              </View>

              {/*harga */}
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  width: '100%',
                }}>
                <Text style={acs.subCardTitle}>Rp. {item.price}</Text>
                <Text style={{fontSize: RFPercentage(1.8)}}>/kamar/malam</Text>
                <TouchableOpacity
                  style={acs.pilihButton}
                  onPress={() =>
                    this.props.navigation.navigate('Accomodation Payment', {
                      accomodationName: this.state.DATA.accomodation_name,
                      accomodationPlace: this.state.DATA.accomodation_place,
                      room: item,
                      user_order: this.state.user_order,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: hp(1.8),
                      fontWeight: 'bold',
                      color: "white"
                    }}>
                    Pilih
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      }
    });
    return (
      <View>
        <ScrollView>
          <View style={ls.mainContainer}>
            {/*Tanggal & Pesanan kamar */}
            <View style={[gs.cardSection, {marginTop: 10, marginBottom: 10}]}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30%',
                  }}>
                  <Text style={{fontSize: RFPercentage(1.6)}}>
                    {this.state.user_order.checkIn}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '70%',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '32%',
                    }}>
                    <Text style={{fontSize: RFPercentage(1.6)}}>
                      {this.state.user_order.stayPeriod} Malam
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '32%',
                    }}>
                    <Text style={{fontSize: RFPercentage(1.6)}}>
                      {this.state.user_order.bed} Kamar
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '32%',
                    }}>
                    <Text style={{fontSize: RFPercentage(1.6)}}>
                      {this.state.user_order.guest} Tamu
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Title */}
            <View style={[gs.cardSection, {marginTop: 10, marginBottom: 10}]}>
              <Text style={{fontSize: RFPercentage(2.7), fontWeight: 'bold'}}>
                {this.state.DATA.accomodation_name}
              </Text>
              <Text style={{fontSize: RFPercentage(1.7)}}>
                {this.state.DATA.accomodation_place}
              </Text>
            </View>
            {/* Rooms */}
            {rooms}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ls = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    paddingBottom: '5%',
  },
  columnContainer: {
    flex: 0,
    flexDirection: 'column',
  },
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

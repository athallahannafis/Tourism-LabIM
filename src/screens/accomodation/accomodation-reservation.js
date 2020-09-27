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
      DATA: props.route.params,
    };
  }

  render() {
    const rooms = this.state.DATA.rooms.map((item) => {
      if (item.breakfast === true) {
        return (
          <View style={[gs.cardSection, {marginTop: 10, marginBottom: 10}]}>
            <Text style={acs.subCardTitle}>{item.category}</Text>
            <View style={acs.mainImageinCardContainer}>
              <SliderBox
                images={item.room_images}
                parentWidth={Dimensions.get('window').width - 50}
                sliderBoxHeight={200}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Icon
                name={'bed'}
                size={15}
                style={{paddingRight: 5, width: 20}}
              />
              <Text style={acs.smallCardText}>{item.room_details.bed}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Icon
                name={'user-alt'}
                size={15}
                style={{paddingRight: 5, width: 20}}
              />
              <Text style={acs.smallCardText}>{item.room_details.guest}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Icon
                name={'utensils'}
                size={15}
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
              <Text style={{fontSize: 12}}>/kamar/malam</Text>
              <TouchableOpacity
                style={acs.pilihButton}
                onPress={() =>
                  this.props.navigation.navigate('Accomodation Payment', {
                    accomodationName: this.state.DATA.accomodation_name,
                    accomodationPlace: this.state.DATA.accomodation_place,
                    room: item,
                  })
                }>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
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
                  sliderBoxHeight={200}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icon
                  name={'bed'}
                  size={15}
                  style={{paddingRight: 5, width: 20}}
                />
                <Text style={acs.smallCardText}>{item.room_details.bed}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icon
                  name={'user-alt'}
                  size={15}
                  style={{paddingRight: 5, width: 20}}
                />
                <Text style={acs.smallCardText}>{item.room_details.guest}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Icon
                  name={'utensils'}
                  size={15}
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
                <Text style={{fontSize: 12}}>/kamar/malam</Text>
                <TouchableOpacity
                  style={acs.pilihButton}
                  onPress={() =>
                    this.props.navigation.navigate('Accomodation Payment', {
                      accomodationName: this.state.DATA.accomodation_name,
                      accomodationPlace: this.state.DATA.accomodation_place,
                      room: item,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
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
                  <Text>16 April 2020</Text>
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
                    <Text>2 Malam</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '32%',
                    }}>
                    <Text>1 Kamar</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '32%',
                    }}>
                    <Text>2 Tamu</Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Title */}
            <View style={[gs.cardSection, {marginTop: 10, marginBottom: 10}]}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {this.state.DATA.accomodation_name}
              </Text>
              <Text style={{fontSize: 12}}>
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

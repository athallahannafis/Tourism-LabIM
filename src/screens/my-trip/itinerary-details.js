import React, {Component} from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {itineraryStyling as its} from '../../style/itinerary-styling';
import {myTripStyling as mts} from '../../style/my-trip-styling';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';

//data
import MyData from '../../data-dummy/data.json'

export default class ItineraryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itinerary_attractions: props.route.params.list_attractions,
      duration: props.route.params.duration,
      destinationName: props.route.params.destinationName,
      itinerary_name: props.route.params.itinerary_name,
      trips: MyData.trips,
      itinerary_nameList: [],
      num: 0,

    }
  }

  UNSAFE_componentWillMount = () => {
  }

  render() {
    let index = 0;
    for (let i=0; i<this.state.trips.length; i++){
      if (this.state.trips[i].destinationName == this.state.destinationName){
        index = i;
      }
    }
    const itineraryList = this.state.itinerary_attractions.map((item) => {
      return (
        <>
          <View style={{marginBottom: hp(2)}}>
            <View style={[gs.cardSection, its.cardInsideDetail, {width: "100%"}]}>
              {/* Left side: Image */}
              <View style={{marginRight: hp(2)}}>
                <Image source={{
                  uri: item.image_source
                }}
                style={{borderRadius: hp(50), width: wp(16), height: hp(8)}}
                />
              </View>
              {/* Right side: name and details */}
              <View style={{width: "78%"}}>
                <Text style={its.cardInsideTitle}>{item.place_name}</Text>
                <Text style={{fontSize: RFPercentage(1.6)}}>
                  {item.description}
                </Text>
                <View style={[gs.rowContainerNoWrap, {marginTop: hp(1.5)}]}>
                  <Icon
                  name={"history"}
                  size={hp(2.5)}
                  color={Color.color6}
                  style={{marginRight: hp(1)}}
                  />
                  <Text style={{fontSize: RFPercentage(1.6)}}>
                    {this.state.duration}</Text>
                </View>
                <View style={gs.rowContainerNoWrap}>
                  <Icon
                  name={"money"}
                  size={hp(2.5)}
                  color={Color.color6}
                  style={{marginRight: hp(1)}}
                  />
                  <Text style={{fontSize: RFPercentage(1.6)}}>{item.detail.ticket_price}</Text>
                </View>
              </View>
            </View>
            <Text style={{marginTop: hp(1),fontSize: RFPercentage(1.6),
              color: "grey", opacity: 0.5}}>
              5 menit menggunakan mobil
            </Text>
          </View>
        </>
      )
    })
    return (
      <ScrollView>
        <View style={ls.mainContainer}>
          {/* BIG IMAGE */}
          <View style={{width: "100%", height: hp(31)}}>
            <Image source={{uri: this.state.trips[index].image}}
            style={{width: "100%", height: "100%"}}
            />
            <View style={[mts.blackOverlay, {height:"100%"}]} />
            <View style={mts.textOnOverlay}>
              <Text
                style={{
                  fontSize: RFPercentage(4),
                  color: Color.white,
                  fontWeight: 'bold',
                }}>
                {this.state.itinerary_name}
              </Text>
            </View>
          </View>

          <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
            {itineraryList}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const ls = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
    paddingBottom: "5%"
  }
})

import React, {Component} from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StarRating from 'react-native-star-rating';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

// Style
import {globalStyling as gs} from '../../style/global-styling';
import {myTripStyling as mts} from '../../style/my-trip-styling';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';
// Data
import Cenderamata from '../../data-dummy/myTrip-data/cenderamata.json';

export default class SouvenirRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      DATA: Cenderamata.data,
      row: [1,1,1,1,1],
    }
  }

  render() {
    const restaurantCard = this.state.DATA.map((item) => {
      return (
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Detail", item)}
        style={mts.restaurantCard}>
          {/* Image section */}
          <Image style={{width: "100%", height: 90}}
          source={{uri: item.image}}
          />
          {/* Restaurant details */}
          <View style={{width: "100%", marginTop: 10}}>
            <Text style={mts.restaurantName}>
              {item.name}
            </Text>
            <View style={{width:"40%", marginVertical: 2}}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rate}
                fullStarColor={Color.color6}
                starSize={hp(1.5)}
              />
            </View>
            <View style={gs.rowContainerNoWrap}>
              <Icon
              name={"money"}
              size={hp(2)}
              color={Color.color6}
              style={{marginRight: 3}}
              />
              <Text style={{fontSize: RFPercentage(1.25)}}>
                {item.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    });

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <View style={{width: "100%", paddingHorizontal:"3%"}}>
            <Text style={gs.cardTitle}>Toko souvenir di sekitar anda</Text>
          </View>
          <View style={{
            flex:0,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            {restaurantCard}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const ls = StyleSheet.create({
  mainContainer: {
    flex: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
    paddingBottom: "5%"
  },
})

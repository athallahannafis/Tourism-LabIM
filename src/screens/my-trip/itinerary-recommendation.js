import React, {Component} from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {itineraryStyling as its} from '../../style/itinerary-styling';
import Color from '../../style/color.json';
import ImagePath from '../../images/dummy-image2.jpeg';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ItineraryRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      temporary_data: {
        list_name: "Situ Patengan, Kawah Putih, Taman Jomblo, Tangkuban Prahu",
        duration: "1 Hari",
        price: "200.000 - 250.000"
      },
      temp_biggerImage: [],
      temp_smallerImage: [],
      city_name: props.route.params
    }
  }

  UNSAFE_componentWillMount = () => {
    this.fetchBiggerImage();
    this.fetchSmallerImage();
  }

  fetchBiggerImage = () => {
    for (let i=0; i<3; i++) {
      this.state.temp_biggerImage.push(ImagePath);
    }
  }

  fetchSmallerImage = () => {
    for (let i=0; i<5; i++) {
      this.state.temp_smallerImage.push(ImagePath);
    }
  }

  render() {
    // TODO render items
    const biggerImage = this.state.temp_biggerImage.map((item) => {
      return (
        <Image style={{width: 110, height: 60, marginLeft: 2, marginRight: 2}}
        source={item}/>
      )
    });

    const smallerImage = this.state.temp_smallerImage.map((item) => {
      return (
        <Image style={{width: 50, height: 25, marginLeft: 2, marginRight: 2}} source={item} />
      )
    })

    const recommendation = this.state.temp_smallerImage.map((item) => {
      return (
        <>
        <TouchableOpacity
        onPress={() => {this.props.navigation.navigate(
          "Detail Rekomendasi", this.state.temporary_data)}}
        style={[gs.cardSection, {marginBottom: 15, backgroundColor: Color.color3, width: "100%"}]}>
          {/* Top section: pictures */}
          <View>
            {/* Bigger Images */}
            <View style={[gs.rowContainerNoWrap, {width: "100%"}]}>
              {biggerImage}
            </View>
            {/* Smaller images */}
            <View style={[gs.rowContainerNoWrap, {width: "100%", marginTop: 5}]}>
              {smallerImage}
            </View>
          </View>
          {/* Bottom section: details */}
          <View style={[its.columnContainer, {marginTop: 20}]}>
            <Text style={{fontWeight:"bold"}}>{this.state.temporary_data.list_name}</Text>
            <View style={gs.rowContainerNoWrap}>
              <Icon
                name={'history'}
                size={15}
                color={Color.color6}
                style={{marginRight: 5}}
              />
              <Text>{this.state.temporary_data.duration}</Text>
            </View>
            <View style={gs.rowContainerNoWrap}>
              <Icon
              name={'money'}
              size={15}
              color={Color.color6}
              style={{marginRight: 5}}
              />
              <Text>{this.state.temporary_data.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
        </>
      )
    })

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <View style={gs.cardSection}>
          <Text style={gs.cardTitle}>Rekomendasi itinerary di {this.state.city_name}</Text>
            {recommendation}
          </View>
        </View>
      </ScrollView>
    )
  }
}

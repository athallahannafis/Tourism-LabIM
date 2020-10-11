import React, {Component} from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import Color from '../../style/color.json';
import ImagePath from '../../images/dummy-image2.jpeg';

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
      temp_smallerImage: []
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

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <View style={gs.cardSection}>

            {/* List of recommendation */}
            <View style={ls.cardInside}>
              {/* Top section: pictures */}
              <View>
                {/* Bigger Images */}
                <View style={[ls.rowContainer, {width: "100%"}]}>
                  {biggerImage}
                </View>
                {/* Smaller images */}
                <View style={[ls.rowContainer, {width: "100%"}]}>
                  {smallerImage}
                </View>
              </View>
              {/* Bottom section: details */}
              <View style={ls.columnContainer}>
                <Text>{this.state.temporary_data.list_name}</Text>
                <Text>{this.state.temporary_data.duration}</Text>
                <Text>{this.state.temporary_data.price}</Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    )
  }
}

const ls = StyleSheet.create({
  cardInside: {
    padding: 7,
    backgroundColor: Color.color1,
    borderRadius: 7
  },
  columnContainer: {
    flex: 0,
    flexDirection: "column",
  },
  rowContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
})
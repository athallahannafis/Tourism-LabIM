import React, {Component} from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {itineraryStyling as its} from '../../style/itinerary-styling';
import Color from '../../style/color.json';
import imagePath from '../../images/dummy-image2.jpeg';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ItineraryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itinerary_names: props.route.params.list_name,
      price: props.route.params.price,
      duration: props.route.params.duration,
      itinerary_nameList: [],
      num: 0,

    }
  }

  UNSAFE_componentWillMount = () => {
    this.splitItineraryNames();
  }

  splitItineraryNames = () => {
    let temp;
    temp = this.state.itinerary_names.split(", ");
    this.state.itinerary_nameList = temp;
  }

  render() {
    const itineraryList = this.state.itinerary_nameList.map((item) => {
      return (
        <>
          <View style={{marginBottom: 20}}>
            <View style={[its.cardInsideDetail, {width: "100%"}]}>
              {/* Left side: Image */}
              <View style={{marginRight:20}}>
                <Image source={imagePath}
                style={{borderRadius: 1000, width: 50, height: 50}}
                />
              </View>
              {/* Right side: name and details */}
              <View style={{width: "78%"}}>
                <Text style={its.cardInsideTitle}>{item}</Text>
                <Text>Itinerary Description</Text>
                <View style={gs.rowContainerNoWrap}>
                  <Icon
                  name={"history"}
                  size={15}
                  color={Color.color6}
                  style={{marginRight: 5}}
                  />
                  <Text>{this.state.duration}</Text>
                </View>
                <View style={gs.rowContainerNoWrap}>
                  <Icon
                  name={"money"}
                  size={15}
                  color={Color.color6}
                  style={{marginRight: 5}}
                  />
                  <Text>{this.state.price}</Text>
                </View>
              </View>
            </View>
            <Text style={{marginTop: 5,fontSize: 15, color: "grey", opacity: 0.5}}>
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
          <View style={{width: "100%", height: 250}}>
            <Image source={imagePath}
            style={{width: "100%", height: "100%"}}
            />
          </View>

          <View style={[gs.cardSection, {marginTop: 30}]}>
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

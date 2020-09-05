import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import { ScrollView } from 'react-native-gesture-handler';

// data
import attInDestination from 
'../../data-dummy/attraction-data/attraction-in-destination.json';

export default class AttractionInDestination extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      touristAtt: [],
      lastTouristAtt: [],
    })
  }

  fetchAttraction = () => {
    const attList = attInDestination.tourist_attraction;
    for (let i = 0; i < attList.length; i++) {
      this.state.touristAtt.push(attList[i]);
    }
    this.state.lastTouristAtt.push(this.state.touristAtt.pop());
  }

  render() {
    const cityName = this.props.route.params;
    this.fetchAttraction();
    const objekWisata = this.state.touristAtt.map((item) => {
      return (
        <View style={[gs.rowContainer, {paddingVertical: 20, borderBottomWidth: 1}]}>
          {/* Left section */}
          <View style={[gs.rowContainer,{width: 100}]}>
            <Image source={require('../../images/dummy-image2.jpeg')}
            style={gs.smallImage}/>
          </View>
          {/* Right section */}
          <View style={[{width: 230, marginLeft: 20}]}>
            <Text style={gs.subCardTitle}>{item.attraction_name}</Text>
            <Text>{item.attraction_desc}</Text>
          </View>
        </View>
      );
    });
    const lastObjekWisata = this.state.lastTouristAtt.map((item) => {
      return (
        <View style={[gs.rowContainer, {paddingVertical: 20}]}>
          {/* Left section */}
          <View style={[gs.rowContainer,{width: 100}]}>
            <Image source={require('../../images/dummy-image2.jpeg')}
            style={gs.smallImage}/>
          </View>
          {/* Right section */}
          <View style={[{width: 230, marginLeft: 20}]}>
            <Text style={gs.subCardTitle}>{item.attraction_name}</Text>
            <Text>{item.attraction_desc}</Text>
          </View>
        </View>
      )
    })

    return (
      <ScrollView>
        <View style={gs.mainContainer}>

          <View style={gs.cardSection}>
            <Text style={gs.cardTitle}>
              Objek wisata populer di {cityName}
            </Text>
            <View style={gs.rowContainer}>
              {/* Left section */}
              <View style={{width: 180}}>
                <Text>{attInDestination.popular_place.city_name}</Text>
                <Image source={require("../../images/dummy-image.jpg")}
                style={gs.bigImage}/>
              </View>
              {/* Right Section */}
              <View style={{width: 180}}>
                <Text style={gs.subCardTitle}>
                  {attInDestination.popular_place.place_name}
                </Text>
                <Text>{attInDestination.popular_place.place_description}</Text>
              </View>
            </View>
          </View>

          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Objek Wisata di {cityName}</Text>
            <View>
            {objekWisata}
            {lastObjekWisata}
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}
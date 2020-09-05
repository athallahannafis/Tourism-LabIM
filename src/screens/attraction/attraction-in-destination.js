import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

// data
import attInDestination from '../../data-dummy/attraction-data/attraction-in-destination.json';

export default class AttractionInDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touristAtt: [],
      lastTouristAtt: [],
    };
  }

  fetchAttraction = () => {
    const attList = attInDestination.tourist_attraction;
    for (let i = 0; i < attList.length; i++) {
      this.state.touristAtt.push(attList[i]);
    }
    this.state.lastTouristAtt.push(this.state.touristAtt.pop());
  };

  render() {
    const cityName = this.props.route.params;
    this.fetchAttraction();
    const objekWisata = this.state.touristAtt.map((item) => {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(
              'Attraction Details',
              item.place_name,
            )
          }>
          <View
            style={[
              gs.rowContainer,
              {paddingVertical: 20, borderBottomWidth: 1},
            ]}>
            {/* Left section */}
            <View style={[gs.rowContainer, {width: 100}]}>
              <Image source={{uri: item.image_source}} style={gs.smallImage} />
            </View>
            {/* Right section */}
            <View style={[{width: 230, marginLeft: 20}]}>
              <Text style={gs.subCardTitle}>{item.place_name}</Text>
              <Text>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
    const lastObjekWisata = this.state.lastTouristAtt.map((item) => {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(
              'Attraction Details',
              item.place_name,
            )
          }>
          <View style={[gs.rowContainer, {paddingVertical: 20}]}>
            {/* Left section */}
            <View style={[gs.rowContainer, {width: 100}]}>
              <Image source={{uri: item.image_source}} style={gs.smallImage} />
            </View>
            {/* Right section */}
            <View style={[{width: 230, marginLeft: 20}]}>
              <Text style={gs.subCardTitle}>{item.place_name}</Text>
              <Text>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <View style={gs.cardSection}>
            <Text style={gs.cardTitle}>Objek wisata populer di {cityName}</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  'Attraction Details',
                  attInDestination.popular_place.place_name,
                )
              }>
              <View style={gs.rowContainer}>
                {/* Left section */}
                <View style={{width: 180}}>
                  <Text>{attInDestination.popular_place.province}</Text>
                  <Image
                    source={{uri: attInDestination.popular_place.image_source}}
                    style={gs.bigImage}
                  />
                </View>
                {/* Right Section */}
                <View style={{width: 180}}>
                  <Text style={gs.subCardTitle}>
                    {attInDestination.popular_place.place_name}
                  </Text>
                  <Text>{attInDestination.popular_place.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    );
  }
}

import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

// data
import attInDestination from '../../data-dummy/attraction-data/attraction-in-destination.json';
import AllAttraction from '../../data-dummy/attraction-data/attraction.json';

export default class AttractionInDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedPlace: '',
      destinationData: [],
      lastTouristAtt: [],
    };
  }

  UNSAFE_componentWillMount = () => {
    this.state.searchedPlace = this.props.route.params;
    this.fetchAttraction(this.state.searchedPlace);
  };

  fetchAttraction = (searchedPlace) => {
    let the_data = AllAttraction.data;
    for (let i = 0; i < the_data.length; i++) {
      attr_list = the_data[i].attraction_list;
      //kalo keyword bagian dari nama kota misal "Jakarta" atau "Jak"
      if (searchedPlace in the_data[i].attraction_place) {
        for (let j = 0; j < attr_list.length; j++) {
          this.state.destinationData.push(attr_list[j]);
        }
      }
      //kalo keyword bagian dari nama tempat/destinasi misal "Monas"
      for (let l = 0; l < attr_list.length; l++) {
        if (
          (searchedPlace in attr_list[l].place_name) |
          (searchedPlace in attr_list[l].city_name)
        ) {
          if (!(attr_list[l] in this.state.destinationData)) {
            this.state.destinationData.push(attr_list[l]);
          }
        }
      }
    }
  };

  render() {
    const objekWisataRender = this.state.destinationData.map((item) => {
      if (item.isPopular === false) {
        const len = this.state.destinationData.length;
        if (item === this.state.destinationData[len - 1]) {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Attraction Details', item)
                }>
                <View style={[gs.rowContainer, {paddingVertical: 20}]}>
                  {/* Left section */}
                  <View style={[gs.rowContainer, {width: 100}]}>
                    <Image
                      source={{uri: item.image_source}}
                      style={gs.smallImage}
                    />
                  </View>
                  {/* Right section */}
                  <View style={[{width: 230, marginLeft: 20}]}>
                    <Text style={gs.subCardTitle}>{item.place_name}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        } else {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Attraction Details', item)
                }>
                <View style={[gs.rowContainer, {paddingVertical: 20}]}>
                  {/* Left section */}
                  <View style={[gs.rowContainer, {width: 100}]}>
                    <Image
                      source={{uri: item.image_source}}
                      style={gs.smallImage}
                    />
                  </View>
                  {/* Right section */}
                  <View style={[{width: 230, marginLeft: 20}]}>
                    <Text style={gs.subCardTitle}>{item.place_name}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{borderBottomWidth: 1}}></View>
            </>
          );
        }
      }
    });

    const wisataPopulerRender = this.state.destinationData.map((item) => {
      if (item.isPopular === true) {
        return (
          <View style={gs.cardSection}>
            <Text style={gs.cardTitle}>Objek Wisata Populer</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Attraction Details', item)
              }>
              <View style={gs.rowContainer}>
                {/* Left section */}
                <View style={{width: 180}}>
                  <Text>{item.city_name}</Text>
                  <Image
                    source={{uri: item.image_source}}
                    style={gs.bigImage}
                  />
                </View>
                {/* Right Section */}
                <View style={{width: 180}}>
                  <Text style={gs.subCardTitle}>{item.place_name}</Text>
                  <Text>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    });

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          {wisataPopulerRender}

          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>
              Objek Wisata terkait {this.state.searchedPlace}
            </Text>
            <View>{objekWisataRender}</View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

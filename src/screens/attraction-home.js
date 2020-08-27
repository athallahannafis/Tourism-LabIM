import React, {Component} from 'react';

// style
import {globalStyling as gs} from '../style/global-styling';
import { View, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// data
import ExploreData from '../data-dummy/attraction-data/explore-indonesia.json';
import WisataPopulerData from '../data-dummy/attraction-data/wisata-populer.json';


export default class AttractionHome extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      city: [],
    })
  }

  // methods
  fetchCities = () => {
    const cityList = ExploreData.data.cities;
    for (let i = 0; i < cityList.length; i++) {
      this.state.city.push(cityList[i])
    }
    console.log(this.state.city);
  }

  render() {
    this.fetchCities();
    cityRender = this.state.city.map((city) => {
      console.log(city);
      return (
        <View style={{margin: 10}}>
          <TouchableOpacity style={gs.smallRectangularCard}
          onPress={() => this.props.navigation.navigate("Attraction in Destination", city)}>
            <Text>{city}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <ScrollView>
        <View style={[gs.mainContainer]}>

          {/* Explore Indonesia */}
          <View style={[gs.cardSection,]}>
            <Text style={gs.cardTitle}>Explore Indonesia</Text>
            <View style={gs.rowContainer}>
              {cityRender}
            </View>
          </View>

          {/* Objek wisata populer */}
          <View style={[gs.cardSection, {marginTop: 20} ]}>
            <Text style={gs.cardTitle}>Objek Wisata Populer</Text>
            <View style={gs.rowContainer}>
              {/* left section */}
              <View style={{width: 180}}>
                <Text>Malang</Text>
                <Image source={{uri: WisataPopulerData.data.image_source}}
                style={{
                  borderRadius: 10,
                  width: 150,
                  height: 100,
                  marginTop: 10
                }}/>
              </View>

              {/* Right Section */}
              <View style={{width:180}}>
                <Text style={{fontWeight: "bold", fontSize: 15}}>
                  {WisataPopulerData.data.place_name}
                </Text>
                <Text>
                  {WisataPopulerData.data.description}
                </Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}

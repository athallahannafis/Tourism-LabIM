import React, {Component} from 'react';

// style
import {globalStyling as gs} from '../../style/global-styling';
import { View, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// data
import ExploreData from '../../data-dummy/attraction-data/explore-indonesia.json';
import WisataPopulerData from '../../data-dummy/attraction-data/wisata-populer.json';

export default class AttractionHome extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      city: [],
      dummyRecImg: [],
    })
  }

  // methods
  fetchCities = () => {
    const cityList = ExploreData.data;
    for (let i = 0; i < cityList.length; i++) {
      this.state.city.push(cityList[i].city_name)
    }
  }

  fetchFirstRecommendation = () => {
    const imagePath = require('../../images/dummy-image2.jpeg');
    for (let i = 0; i < 3; i++) {
      this.state.dummyRecImg.push(imagePath);
    }
  }

  render() {
    this.fetchCities();
    this.fetchFirstRecommendation();

    const cityRender = this.state.city.map((city) => {
      return (
        <View style={{margin: 10}}>
          <TouchableOpacity style={gs.smallRectangularCard}
          onPress={() => this.props.navigation.navigate("Attraction in Destination", city)}>
            <Text>{city}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    const dummyRecommendation = this.state.dummyRecImg.map((item) => {
      return (
        <View>
          <Image style={[gs.smallImage, {marginHorizontal: 5}]} source={item}/>
        </View>
      )
    })

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
                style={gs.bigImage}/>
              </View>

              {/* Right Section */}
              <View style={{width:180}}>
                <Text style={gs.subCardTitle}>
                  {WisataPopulerData.data.place_name}
                </Text>
                <Text>
                  {WisataPopulerData.data.description}
                </Text>
              </View>
            </View>
          </View>

          {/* Rekomendasi objek wisata */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Rekomendasi Objek Wisata</Text>
            
            <View style={{marginBottom: 20}}>
              <Text style={{marginBottom: 5}}>Karena anda sempat melihat Bromo Tengger Semeru</Text>
              <View style={gs.rowContainer}>
                {dummyRecommendation}
              </View>
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={{marginBottom: 5}}>Karena anda sempat melihat Mandalika</Text>
              <View style={gs.rowContainer}>
                {dummyRecommendation}
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}

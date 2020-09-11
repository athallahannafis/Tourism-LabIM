import React, {Component} from 'react';
// style
import {globalStyling as gs} from '../../style/global-styling';
import {View, Text, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

// data
import WisataPopulerData from '../../data-dummy/attraction-data/wisata-populer.json';
import AllAttraction from '../../data-dummy/attraction-data/attraction.json';

export default class AttractionHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ATTRACTION_LIST: AllAttraction.data,
      city: [],
      recommendImage: [],
    };
  }

  // methods
  fetchCities = () => {
    const city_num = 6;
    for (let i = 0; i < city_num; i++) {
      this.state.city.push(this.state.ATTRACTION_LIST[i].attraction_place);
    }
  };

  fetchFirstRecommendation = () => {
    const temp = this.state.ATTRACTION_LIST;
    for (let i = 0; i < 3; i++) {
      const imageURL = temp[i].attraction_list[0].image_source;
      this.state.recommendImage.push(imageURL);
    }
  };

  render() {
    this.fetchCities();
    this.fetchFirstRecommendation();
    let index = 0;
    const cityRender = this.state.city.map((item) => {
      const imageURL = this.state.ATTRACTION_LIST[index].attraction_list[1].image_source;
      index++;
      return (
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={gs.smallRectangularCard}
            onPress={() =>
              this.props.navigation.navigate('Attraction in Destination', item)
            }>
            <Image style={gs.smallRectangularCard} source={{uri: imageURL}}/>
            <View style={[gs.smallRectangularCard,
            {backgroundColor: "black", position: "absolute", opacity: 0.4}]}/>
            <View style={[gs.smallRectangularCard, {position: "absolute"}]}>
              <Text style={{color: "white", fontWeight: "bold"}}>{item}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });

    const dummyRecommendation = this.state.recommendImage.map((item) => {
      return (
        <View>
          <Image style={[gs.smallImage, {marginHorizontal: 5}]} source={{uri: item}} />
        </View>
      );
    });

    return (
      <ScrollView>
        <View style={[gs.mainContainer]}>
          {/* Explore Indonesia */}
          <View style={[gs.cardSection]}>
            <Text style={gs.cardTitle}>Explore Indonesia</Text>
            <View style={gs.rowContainer}>{cityRender}</View>
          </View>

          {/* Objek wisata populer */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Objek Wisata Populer</Text>
            <TouchableOpacity
              style={gs.rowContainer}
              onPress={() =>
                this.props.navigation.navigate(
                  'Attraction Details'
                  // TODO: Pass data to attraction detail
                )
              }>
              {/* left section */}
              <View style={{width: 180}}>
                <Text>Malang</Text>
                <Image
                  source={{uri: WisataPopulerData.data.image_source}}
                  style={gs.bigImage}
                />
              </View>

              {/* Right Section */}
              <View style={{width: 180}}>
                <Text style={gs.subCardTitle}>
                  {WisataPopulerData.data.place_name}
                </Text>
                <Text>{WisataPopulerData.data.description}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Rekomendasi objek wisata */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Rekomendasi Objek Wisata</Text>

            <View style={{marginBottom: 20}}>
              <Text style={{marginBottom: 5}}>
                Karena anda sempat melihat Bromo Tengger Semeru
              </Text>
              <View style={gs.rowContainer}>{dummyRecommendation}</View>
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={{marginBottom: 5}}>
                Karena anda sempat melihat Mandalika
              </Text>
              <View style={gs.rowContainer}>{dummyRecommendation}</View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

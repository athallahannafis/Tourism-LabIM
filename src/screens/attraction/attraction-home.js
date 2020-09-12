import React, {Component} from 'react';
// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {View, Text, Image} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      popularPlace: {},
      search: '',
    };
  }

  // methods
  UNSAFE_componentWillMount = () => {
    this.fetchCities();
    this.fetchFirstRecommendation();
    this.fetchPopularPlace();
  };

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

  fetchPopularPlace = () => {
    const places = this.state.ATTRACTION_LIST;
    for (let i = places.length - 1; i >= 0; i--) {
      for (let j = places[i].attraction_list.length - 1; j >= 0; j--) {
        if (places[i].attraction_list[j].isPopular == true) {
          this.state.popularPlace = places[i].attraction_list[j];
        }
      }
    }
  };

  changeText = (search) => {
    this.setState({search: search});
  };

  handleSearch = (e) => {
    this.props.navigation.navigate(
      'Attraction Search Results',
      e.nativeEvent.text,
    );
  };

  render() {
    let index = 0;
    const cityRender = this.state.city.map((item) => {
      const imageURL = this.state.ATTRACTION_LIST[index].attraction_list[1]
        .image_source;
      index++;
      return (
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={gs.smallRectangularCard}
            onPress={() =>
              this.props.navigation.navigate('Attraction in Destination', item)
            }>
            <Image style={gs.smallRectangularCard} source={{uri: imageURL}} />
            <View
              style={[
                gs.smallRectangularCard,
                {backgroundColor: 'black', position: 'absolute', opacity: 0.4},
              ]}
            />
            <View style={[gs.smallRectangularCard, {position: 'absolute'}]}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>{item}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });

    const dummyRecommendation = this.state.recommendImage.map((item) => {
      return (
        <View>
          <Image
            style={[gs.smallImage, {marginHorizontal: 5}]}
            source={{uri: item}}
          />
        </View>
      );
    });

    return (
      <ScrollView>
        <View style={[gs.mainContainer]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  'Attraction Search Results',
                  this.state.search,
                )
              }>
              <Icon
                style={{marginRight: 5}}
                name={'search'}
                size={18}
                color={Color.color2}
              />
            </TouchableOpacity>

            <View
              style={{
                width: '80%',
                height: 25,
                borderRadius: 5,
                backgroundColor: Color.color3,
                shadowColor: 'black',
                shadowOpacity: 1.0,
                elevation: 8,
                marginLeft: 10,
              }}>
              <TextInput
                style={{
                  fontSize: 12,
                  color: 'black',
                  textAlign: 'left',
                  textAlignVertical: 'center',
                  paddingBottom: 2,
                  paddingTop: 2,
                  paddingLeft: 5,
                }}
                placeholder={'Search...'}
                onChangeText={this.changeText}
                onEndEditing={this.handleSearch}
              />
            </View>
          </View>
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
                  'Attraction Details',
                  this.state.popularPlace,
                )
              }>
              {/* left section */}
              <View style={{width: 180}}>
                <Text>{this.state.popularPlace.city_name}</Text>
                <Image
                  source={{uri: this.state.popularPlace.image_source}}
                  style={gs.bigImage}
                />
              </View>

              {/* Right Section */}
              <View style={{width: 180}}>
                <Text style={gs.subCardTitle}>
                  {this.state.popularPlace.place_name}
                </Text>
                <Text>{this.state.popularPlace.description}</Text>
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

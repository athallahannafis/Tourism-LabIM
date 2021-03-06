import React, {Component} from 'react';
// style
import {globalStyling as gs} from '../../style/global-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {View, Text, Image, Modal, TouchableOpacity} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as dp} from 'react-native-responsive-screen'
import {RFPercentage} from 'react-native-responsive-fontsize'
// data
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
      wisata_alam: false,
      tantangan: false,
      budaya_lokal: false,
      kuliner: false,
      perbelanjaan: false,
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
    this.state.search.clear();
    this.setState({search: ''});
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
        <View style={{margin: dp(1)}}>
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
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: RFPercentage(2.2)
                }}>{item}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });

    const dummyRecommendation = this.state.recommendImage.map((item) => {
      return (
        <View>
          <Image
            style={[gs.smallRectangularCard, {marginHorizontal: 5}]}
            source={{uri: item}}
          />
        </View>
      );
    });

    return (
      <ScrollView>
        <View style={[gs.mainContainer]}>
          <View style={ats.searchBoxContainer}>
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

            <View style={ats.searchBox}>
              <TextInput
                autoCorrect={false}
                style={ats.searchBoxTextInput}
                placeholder={'Search...'}
                onChangeText={this.changeText}
                onEndEditing={this.handleSearch}
                ref={(input) => {
                  this.state.search = input;
                }}
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
              style={[gs.rowContainerNoWrap]}
              onPress={() =>
                this.props.navigation.navigate(
                  'Attraction Details', {
                    'attraction': this.state.popularPlace,
                    'fromItinerary': false
                  }
                )
              }>
              {/* left section */}
              <View style={{width: wp(40)}}>
                <Text style={{fontSize: RFPercentage(1.6)}}>
                  {this.state.popularPlace.city_name}
                </Text>
                <Image
                  source={{uri: this.state.popularPlace.image_source}}
                  style={gs.bigImage}
                />
              </View>

              {/* Right Section */}
              <View style={{width: wp(40)}}>
                <Text style={gs.subCardTitle}>
                  {this.state.popularPlace.place_name}
                </Text>
                <Text style={{fontSize: RFPercentage(1.6)}}>
                  {this.state.popularPlace.description}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Rekomendasi objek wisata */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Rekomendasi Objek Wisata</Text>

            <View style={{marginBottom: 20}}>
              <Text style={{marginBottom: 5, fontSize: RFPercentage(1.6)}}>
                Karena anda sempat melihat Bromo Tengger Semeru
              </Text>
              <View style={gs.rowContainer}>{dummyRecommendation}</View>
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={{marginBottom: 5, fontSize: RFPercentage(1.6)}}>
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

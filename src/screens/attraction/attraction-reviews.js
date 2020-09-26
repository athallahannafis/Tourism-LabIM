import React, {Component, useEffect, useState} from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';

// style
import {globalStyling as gs} from '../../style/global-styling';
import Color from '../../style/color.json';
import {Picker} from '@react-native-community/picker';
// data
import {Colors} from 'react-native/Libraries/NewAppScreen';
import data from '../../data-dummy/attraction-data/attraction.json';

export default class AttractionReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReviewData: [],
      num: 0,
      selectedValue: '',
      sortBy: 'rating',
    };
  }

  UNSAFE_componentWillMount = () => {};

  setSelectedValue = (value) => {
    this.setState({
      sortBy: value,
      ReviewData: [],
    });
    this.render();
  };

  render() {
    const attractionData = this.props.route.params;
    const index_1 = 0;
    const index_2 = 0;
    for (let item = 0; item < data.length; item++) {
      for (let item2 = 0; item2 < data[item].length; item2++) {
        if (data.data[item].attraction_list[item2] == attractionData) {
          index_1 = item;
          index_2 = item2;
        }
      }
    }
    const reviewsData = attractionData.attraction_reviews;
    this.state.ReviewData = reviewsData;
    if (this.state.sortBy === 'rating') {
      this.state.ReviewData =
        data.data[index_1].attraction_list[index_2].attraction_reviews;
      this.state.ReviewData.sort(function (a, b) {
        return b.rate - a.rate;
      });
    } else if (this.state.sortBy === 'tanggal') {
      this.state.ReviewData =
        data.data[index_1].attraction_list[index_2].attraction_reviews;
      this.state.ReviewData.sort(function (a, b) {
        if (a.review_time > b.review_time) {
          return -1;
        }
        if (a.review_time < b.review_time) {
          return 1;
        }
        return 0;
      });
    } else {
      // this.state.ReviewData =
      //   data.data[index_1].attraction_list[index_2].attraction_reviews;
      // for (let i = 0; i < this.state.ReviewData.length; i++) {
      //   if (this.state.ReviewData[i].photos.length == 0) {
      //     console.log(this.state.ReviewData[i].username);
      //     this.state.ReviewData.pop(this.state.ReviewData[i]);
      //   }
      // }
    }
    const renderReview = reviewsData.map((item) => {
      let images;
      if (item.photos.length != 0) {
        images = item.photos.map((photoSource) => {
          return <Image style={ls.smallImage} source={{uri: photoSource}} />;
        });
      }
      return (
        <View style={[gs.cardSection, {marginBottom: 20}]}>
          <View style={[gs.rowContainer, {width: '100%'}]}>
            {/* leftside */}
            <View
              style={{
                maxWidth: '30%',
                marginRight: 14,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {item.username}
              </Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rate}
                fullStarColor={Color.color6}
                starSize={20}
              />
              <Text>{item.review_time}</Text>
            </View>
            {/* Right side */}
            <View
              style={[gs.columnContainer, {maxWidth: '60%', marginLeft: 14}]}>
              <Text style={{marginBottom: 10}}>{item.review}</Text>
              <View style={ls.rowContainer}>{images}</View>
            </View>
          </View>
        </View>
      );
    });

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <Text style={[gs.cardTitle, {width: 250, textAlign: 'center'}]}>
            Seluruh ulasan untuk {attractionData.place_name}
          </Text>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 20,
            }}>
            <Text>Urutkan berdasarkan</Text>
            <Picker
              style={{width: 200}}
              selectedValue={this.state.sortBy}
              onValueChange={(itemValue, itemIndex) =>
                this.setSelectedValue(itemValue)
              }>
              <Picker.Item label="rating" value="rating" />
              <Picker.Item label="dengan gambar" value="dengan_gambar" />
              <Picker.Item label="tanggal" value="tanggal" />
            </Picker>
          </View>
          {renderReview}
        </View>
      </ScrollView>
    );
  }
}

const ls = StyleSheet.create({
  smallImage: {
    width: 64,
    height: 36,
    borderRadius: 10,
    margin: 4,
  },
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

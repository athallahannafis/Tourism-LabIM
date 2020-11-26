import React, {Component, useEffect, useState} from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';


// style
import {globalStyling as gs} from '../../style/global-styling';
import Color from '../../style/color.json';
import {Picker} from '@react-native-community/picker';
// data
import {Colors} from 'react-native/Libraries/NewAppScreen';
import data from '../../data-dummy/attraction-data/attraction.json';

export default class AccomodationReviews extends Component {
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
    const accomodationData = this.props.route.params;
    console.log(accomodationData);
    const accomodationReviews = accomodationData.reviews;
    this.state.ReviewData = accomodationReviews;
    if (this.state.sortBy === 'rating') {
      this.state.ReviewData.sort(function (a, b) {
        return b.rate - a.rate;
      });
    } else if (this.state.sortBy === 'tanggal') {
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
    const renderReview = accomodationReviews.map((item) => {
      let images;
      if (item.photos.length != 0) {
        images = item.photos.map((photoSource) => {
          return <Image style={ls.smallImage} source={{uri: photoSource}} />;
        });
      }
      return (
        <View style={[gs.cardSection, {marginBottom: 20}]}>
          <View style={[ls.rowContainerNoWrap, {width: '100%'}]}>
            {/* leftside */}
            <View
              style={{
                maxWidth: '30%',
                marginRight: 14,
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                  fontWeight: 'bold',
                }}>
                {item.username}
              </Text>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={item.rate}
                fullStarColor={Color.color6}
                starSize={hp(3)}
              />
              <Text style={{fontSize: RFPercentage(1.4)}}>{item.review_time}</Text>
            </View>
            {/* Right side */}
            <View
              style={[gs.columnContainer, {maxWidth: '60%', marginLeft: 14}]}>
              <Text style={{fontSize: RFPercentage(1.4)}}>{item.review}</Text>
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
            Seluruh ulasan untuk {accomodationData.accomodation_name}
          </Text>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 20,
              width: "95%"
            }}>
            <Text style={{fontSize: RFPercentage(2.0)}}>Urutkan berdasarkan</Text>
            <Picker
            style={{width: "40%", backgroundColor: Color.color1,
            scaleX: 0.8, scaleY: 0.8}}
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
    width: wp(16),
    height: hp(5),
    borderRadius: hp(5)/8,
    margin: 4,
  },
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: "100%"
  },
  rowContainerNoWrap: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

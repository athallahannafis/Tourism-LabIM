import React, {Component} from 'react';
import { ScrollView, View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';

// style
import {globalStyling as gs} from '../../style/global-styling';
import Color from '../../style/color.json';
// data
import Review from '../../data-dummy/attraction-data/attraction-review.json';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class AttractionReviews extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
      reviewData: [],
    })
  }

  UNSAFE_componentWillMount = () => {
    this.fetchReview();
  }

  fetchReview = () => {
    for (let i = 0; i < Review.data.length; i++) {
      this.state.reviewData.push(Review.data[i]);
    }
    console.log(this.state.reviewData);
  }

  render() {
    const attractionName = this.props.route.params;
    console.log(attractionName);
    const renderReview = this.state.reviewData.map((item) => {
      return (
        <View style={[gs.cardSection, {marginBottom: 20}]}>
          <View style={[gs.rowContainer, {width: "100%"}]}>
            {/* leftside */}
            <View style={{
              maxWidth: "30%",
              marginRight: 14
            }}>
              <Text style={{
                fontSize: 20,
                fontWeight: "bold"}}>{item.username}</Text>
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
            <View style={[gs.columnContainer,
              { maxWidth: "60%",
                marginLeft: 14
            }]}>
              <Text>{item.review}</Text>
            </View>
          </View>
        </View>
      )
    })

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <Text style={gs.cardTitle}>Seluruh ulasan untuk</Text>
          <Text style={gs.cardTitle}>{attractionName}</Text>
          {renderReview}
        </View>
      </ScrollView>
    )
  }
}

import React, {Component} from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating';

// style
import {globalStyling as gs} from '../../style/global-styling';
import Color from '../../style/color.json';
// data
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class AttractionReviews extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
    })
  }

  UNSAFE_componentWillMount = () => {

  }

  render() {
    const attractionData = this.props.route.params;
    const renderReview = attractionData.attraction_reviews.map((item) => {
      let images;
      if (item.photos.length != 0) {
        images = item.photos.map((photoSource) => {
          return (
            <Image style={ls.smallImage} source={{uri: photoSource}} />
          )
        })
      }
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
              <Text style={{marginBottom: 10}}>{item.review}</Text>
              <View style={ls.rowContainer}>{images}</View>
            </View>
          </View>
        </View>
      )
    })

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <Text style={[gs.cardTitle, {width: 250, textAlign: "center"}]}>
            Seluruh ulasan untuk {attractionData.place_name}
          </Text>
          {renderReview}
        </View>
      </ScrollView>
    )
  }
}

const ls = StyleSheet.create({
  smallImage: {
    width: 64,
    height: 36,
    borderRadius: 10,
    margin: 4
  },
  rowContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  }
})

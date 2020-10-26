import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import StarRating from 'react-native-star-rating';
import Color from '../../style/color.json';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class RestaurantSouvenirDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      DATA: props.route.params,
      smallImages: [1,1,1,1]
    };
  }

  render() {
    const accImages = this.state.smallImages.map((item) => {
      return <Image source={{uri: this.state.DATA.image}} style={ats.smallImage2} />;
    });

    console.log(this.state.DATA)

    return (
      <View style={[ats.container]}>
        <ScrollView>
          <View style={ls.mainContainer}>
            {/* Images */}
            <View style={ats.mainImageContainer}>
              <Image
                source={{uri: this.state.DATA.image}}
                style={ats.mainImage}
              />
              <View style={ats.rowImageContainer}>
                {accImages}
                <View style={[ats.smallImageBlackOverlay, {marginLeft: 22}]} />
                <View style={[ats.textOnImageContainer, {marginLeft: 22}]}>
                  <Text style={ats.textOnImage}>Lihat</Text>
                  <Text style={ats.textOnImage}>Semua foto</Text>
                </View>
              </View>
            </View>

            {/* Price and description */}
            <View style={gs.cardSection}>
              <Text style={gs.cardTitle}>
                {this.state.DATA.name}
              </Text>
              <View style={ats.starRatingView}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.DATA.rate}
                  fullStarColor={Color.color6}
                  starSize={17}
                />
                <Text
                  style={[
                    ats.textSmall,
                    {color: Color.color6, marginLeft: 10},
                  ]}>
                  {this.state.DATA.rate}
                </Text>
                <View style={ats.rowContainer}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: Color.color4,
                    }}>
                    Rp{this.state.DATA.price}
                  </Text>
                  <Text style={{color: Color.color4}}> / orang</Text>
                </View>

                <View
                  style={[
                    ats.rowContainer,
                    {
                      width: 200,
                      marginTop: 5,
                    },
                  ]}>
                  <TouchableOpacity
                    style={ats.reviewBtn}
                    // TODO: Navigate to reviews
                    >
                    <Text style={[ats.cardMediumText, {fontWeight: 'bold'}]}>
                      ({this.state.DATA.reviews_count} reviews)
                    </Text>
                  </TouchableOpacity>
                  {/* TODO: Implement map */}
                  <TouchableOpacity
                  style={ats.reviewBtn}
                  // TODO: navigate to map
                  >
                    <Text style={[ats.cardMediumText, {fontWeight: 'bold'}]}>
                      Show on map
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[ats.cardMediumText, {marginTop: 10}]}>
                {this.state.DATA.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const ls = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    paddingBottom: '5%',
  },
  columnContainer: {
    flex: 0,
    flexDirection: 'column',
  },
  rowContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

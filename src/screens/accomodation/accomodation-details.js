import React, {Component} from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import StarRating from 'react-native-star-rating';
import Color from '../../style/color.json';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class AccomodationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      num: 0,
      DATA: props.route.params,
    })
  }

  render() {
    const accImages = this.state.DATA.images_source.map((item) => {
      console.log(item);
      return (
        <Image source={{uri:item}} style={ats.smallImage2}/>
      )
    })

    const facilities = this.state.DATA.details.facility.map((item) => {
      return (
        <>
          <View style={ls.rowContainer}>
            <View style={[ats.smallCircle, {marginLeft: 10}]}></View>
            <Text>{item}</Text>
          </View>
        </>
      )
    })

    return (
      <ScrollView>
        <View style={ls.mainContainer}>
          {/* Images */}
          <View style={ats.mainImageContainer}>
            <Image source={{uri: this.state.DATA.images_source[0]}}
            style={ats.mainImage}/>
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
            <Text style={gs.cardTitle}>{this.state.DATA.accomodation_name}</Text>
            <Text style={ats.cardSmallText}>
              {this.state.DATA.accomodation_place}
            </Text>
            <View style={ats.starRatingView}>
              <StarRating
              disabled={true}
              maxStars={5}
              rating={this.state.DATA.rate}
              fullStarColor={Color.color6}
              starSize={17}
              />
              <Text style={[
                ats.textSmall, {color: Color.color6, marginLeft: 10},
              ]}>
                {this.state.DATA.rate}
              </Text>
              <View style={[ats.rowContainer, {
                width: 200, marginTop: 5}]}>
                <TouchableOpacity
                style={ats.reviewBtn}
                onPress={() => this.props.navigation.navigate(
                  "Accomodation Review", this.state.DATA
                )}>
                  <Text style={[ats.cardMediumText, {fontWeight: 'bold'}]}>
                    ({this.state.DATA.reviews.length} reviews)
                  </Text>
                </TouchableOpacity>
                {/* TODO: Implement map */}
                <TouchableOpacity
                style={ats.reviewBtn}
                onPress={() => this.props.navigation.navigate(
                  "Accomodation Map", this.state.DATA
                )}>
                  <Text style={[ats.cardMediumText, {fontWeight: 'bold'}]}>
                    Show on map
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={ats.rowContainer}>
                <Text style={{fontSize: 20, fontWeight: "bold", color: Color.color4}}>
                  Rp{this.state.DATA.details.price.toString()}
                </Text>
                <Text style={{color: Color.color4}}> / malam</Text>
              </View>

            </View>
            <Text style={[ats.cardMediumText, {marginTop: 10}]}>
              {this.state.DATA.description}
            </Text>
          </View>

          {/* Details */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>
              Detail Akomodasi
            </Text>
            {/* Facilities */}
            <View>
              <Text style={{fontWeight: "bold"}}>Fasilitas:</Text>
              <View style={[ats.rowContainer, {marginLeft: "1%",width: "100%", height: 50}]}>
                <View style={[ls.columnContainer, {flexWrap: "wrap", height: 40}]}>
                  {facilities}
                </View>
              </View>
            </View>
            {/* Map */}
            <View style={{width: "100%", height: 200}}>
              <MapView style={{width: "100%", height: "100%"}}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              showsBuildings={true}
              region={{
                latitude: this.state.DATA.details.coordinates.latitude,
                longitude: this.state.DATA.details.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
              >
                <MapView.Marker
                coordinate={{
                  latitude: this.state.DATA.details.coordinates.latitude,
                  longitude: this.state.DATA.details.coordinates.longitude
                }}
                />
              </MapView>
            </View>
            {/* Check-in check-out */}
            <View style={ls.columnContainer}>
              <Text style={[gs.subCardTitle, {marginTop: 50}]}>
                Waktu check-in dan check-out
              </Text>
              <View style={ls.rowContainer}>
                <View style={ats.smallCircle}/>
                <Text>Mulai: {this.state.DATA.details.checkin}</Text>
              </View>
              <View style={ls.rowContainer}>
                <View style={ats.smallCircle}/>
                <Text>Sebelum: {this.state.DATA.details.checkout}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const ls = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    paddingBottom: "5%"
  },
  columnContainer: {
    flex: 0,
    flexDirection: "column",
  },
  rowContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
})

import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import StarRating from 'react-native-star-rating';
import Color from '../../style/color.json';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class AccomodationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      DATA: props.route.params.acc,
      dateExist: props.route.params.date_exist,
      user_order: props.route.params.user_order,
    };
  }

  render() {
    console.log("TEST");
    console.log('=======');
    console.log(this.state.dateExist);
    console.log(this.state.user_order);

    const imageList = this.state.DATA.images_source;
    const lastAccImg =
      <View>
        <Image source={{uri: imageList[imageList-1]}} style={ats.smallImage2} />
        <View style={[ats.smallImageBlackOverlay]}>
          <View style={[ats.textOnImageContainer]}>
            <Text style={ats.textOnImage}>Lihat</Text>
            <Text style={ats.textOnImage}>Semua Foto</Text>
          </View>
        </View>
      </View>;
    let index = 0;
    const accImages = imageList.map((item) => {
      if (index !== imageList.length-1) {
        index++;
        return <Image source={{uri: item}} style={ats.smallImage2} />;
      } else {
        index++;
        return lastAccImg;
      }
    });

    const facilities = this.state.DATA.details.facility.map((item) => {
      return (
        <>
          <View style={[ls.rowContainer]}>
            <View style={[ats.smallCircle, {marginLeft: 10}]}></View>
            <Text style={{fontSize: RFPercentage(1.6)}}>{item}</Text>
          </View>
        </>
      );
    });

    return (
      <View>
      <ScrollView>
        <View style={[ats.container, {backgroundColor: "white"}]}>
          <View style={ats.mainImageContainer}>
            <Image
              source={{uri: this.state.DATA.images_source[0]}}
              style={ats.mainImage}
            />
            <View style={ats.rowImageContainer}>
              {accImages}
            </View>
          </View>

           {/* Price and description */}
           <View style={gs.cardSection}>
              <Text style={gs.cardTitle}>
                {this.state.DATA.accomodation_name}
              </Text>
              <Text style={ats.cardSmallText}>
                {this.state.DATA.accomodation_place}
              </Text>
              <View style={ats.starRatingView}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={this.state.DATA.rate}
                  fullStarColor={Color.color6}
                  starSize={hp(3)}
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
                      fontSize: RFPercentage(2.5)
                    }}>
                    Rp{this.state.DATA.details.price.toString()}
                  </Text>
                  <Text style={{color: Color.color4,
                  fontSize: RFPercentage(2.0)}}> / malam</Text>
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
                    onPress={() =>
                      this.props.navigation.navigate(
                        'Accomodation Review',
                        this.state.DATA,
                      )
                    }>
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
              </View>
              <Text style={[ats.cardMediumText, {marginTop: 10}]}>
                {this.state.DATA.description}
              </Text>
            </View>

            {/* Details */}
            <View style={[gs.cardSection, {marginTop: 20, marginBottom: 20}]}>
              <Text style={gs.cardTitle}>Detail Akomodasi</Text>
              {/* Facilities */}
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: RFPercentage(1.6)
                  }}>Fasilitas:</Text>
                <View
                  style={[
                    ats.rowContainer,
                    {marginLeft: '1%', width: '100%', height: 50},
                  ]}>
                  <View
                    style={[
                      ls.columnContainer,
                      {flexWrap: 'wrap', height: 40},
                    ]}>
                    {facilities}
                  </View>
                </View>
              </View>
              {/* Map */}
              <View style={{width: '100%', height: 200}}>
                <MapView
                  style={{width: '100%', height: '100%'}}
                  provider={PROVIDER_GOOGLE}
                  showsUserLocation={true}
                  showsBuildings={true}
                  region={{
                    latitude: this.state.DATA.details.coordinates.latitude,
                    longitude: this.state.DATA.details.coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}>
                  <MapView.Marker
                    coordinate={{
                      latitude: this.state.DATA.details.coordinates.latitude,
                      longitude: this.state.DATA.details.coordinates.longitude,
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
                  <View style={ats.smallCircle} />
                  <Text style={{fontSize: RFPercentage(1.6)}}>
                    Mulai: {this.state.DATA.details.checkin}
                  </Text>
                </View>
                <View style={ls.rowContainer}>
                  <View style={ats.smallCircle} />
                  <Text style={{fontSize: RFPercentage(1.6)}}>
                    Sebelum: {this.state.DATA.details.checkout}
                  </Text>
                </View>
              </View>
            </View>
        </View>
      </ScrollView>
      {this.state.dateExist ? (
        <View style={ats.floatingButtonContainer}>
          <TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Accomodation Reservation', {
                  data: this.state.DATA,
                  user_order: this.state.user_order,
                })
              }
              style={ats.floatingButton}>
              <Text style={ats.floatingButtonText}>Pesan Kamar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      </View>
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

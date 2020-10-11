import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {myTripStyling as mts} from '../../style/my-trip-styling';

//adition
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Color from '../../style/color.json';

export default class MyTripDestinationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationName: props.route.params,
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={[ats.mainContainer, {alignItems: 'center'}]}>
          {/*Section Gambar dengan black overlay */}
          <View>
            <Image
              source={{
                uri:
                  'https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg',
              }}
              style={mts.bigImage}
            />
            <View style={mts.blackOverlay} />
            <View style={mts.textOnOverlay}>
              <Text
                style={{
                  fontSize: 30,
                  color: Color.white,
                  fontWeight: 'bold',
                }}>
                {this.state.destinationName}
              </Text>
              <Text style={{color: Color.white, fontWeight: 'bold'}}>
                Sen, 24 Agu - Min, 30 Agu
              </Text>
            </View>
          </View>

          {/*Itinerary */}
          <TouchableOpacity
            style={mts.itineraryButton}
            onPress={() => this.props.navigation.navigate('Itinerary')}>
            <Text
              style={{color: Color.white, fontWeight: 'bold', fontSize: 15}}>
              Itinerary
            </Text>
          </TouchableOpacity>

          {/*Reservasi Perjalanan */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Reservasi Perjalanan</Text>
            <View style={mts.reservationBubble}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', marginRight: 10}}>
                  BTJ - DPS
                </Text>
                <Text>Garuda Indonesia GA-401</Text>
              </View>
              {/*Detail pesanan */}
              <View style={{marginLeft: 20, marginTop: 5}}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                  Min, 22 Agu 2020
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {/*Kolom kiri */}
                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{fontSize: 12}}>Jakarta</Text>
                    <Text style={{fontSize: 12}}>
                      Soekarno Hatta Intl (CGK)
                    </Text>
                    <Text style={{fontSize: 12}}>Berangkat 06.30</Text>
                  </View>
                  {/*Kolom kanan */}
                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{fontSize: 12}}>Bali</Text>
                    <Text style={{fontSize: 12}}>Ngurah Rai Intl (DPS)</Text>
                    <Text style={{fontSize: 12}}>Tiba 07.30</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/*Reservasi Hotel */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Reservasi Hotel</Text>
            <View style={mts.reservationBubble}>
              <Text style={{fontWeight: 'bold'}}>Parthi Puri Ubud</Text>
              <Text style={{marginLeft: 10, marginTop: 5, fontSize: 12}}>
                Br. Silungan, Lodtunduh, Kecamatan Ubud, Kabupaten Gianyar, Bali
                80571
              </Text>
              <View
                style={{flexDirection: 'row', marginLeft: 20, marginTop: 5}}>
                {/*Kolom kiri */}
                <View style={{flexDirection: 'column', marginLeft: 25}}>
                  <Text style={{fontSize: 12}}>Check in:</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Sen, 24 Agu 2020
                  </Text>
                </View>
                {/*Kolom kanan */}
                <View style={{flexDirection: 'column', marginLeft: 25}}>
                  <Text style={{fontSize: 12}}>Check out:</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Rab, 26 Agu 2020
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

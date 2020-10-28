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

//data
import MyData from '../../data-dummy/data.json';

export default class MyTripDestinationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationName: props.route.params,
      trips: MyData.trips,
    };
  }

  render() {
    let index = 0;
    for (let i=0; i<this.state.trips.length; i++){
      if (this.state.trips[i].destinationName == this.state.destinationName){
        index = i;
      }
    }
    const reservasiPerjalanan = this.state.trips[index].reservedTransportation.map((item) => {
      return(
        <View style={mts.reservationBubble}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', marginRight: 10}}>
                  {item.departCityCode} - {item.arriveCityCode}
                </Text>
                <Text>{item.transportName}</Text>
              </View>
              {/*Detail pesanan */}
              <View style={{marginLeft: 20, marginTop: 5}}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                  {item.date}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {/*Kolom kiri */}
                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{fontSize: 12}}>{item.departCity}</Text>
                    <Text style={{fontSize: 12}}>
                      {item.departStation}
                    </Text>
                    <Text style={{fontSize: 12}}>Berangkat {item.departTime}</Text>
                  </View>
                  {/*Kolom kanan */}
                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{fontSize: 12}}>{item.arriveCity}</Text>
                    <Text style={{fontSize: 12}}>{item.arriveStation})</Text>
                    <Text style={{fontSize: 12}}>Tiba {item.arriveTime}</Text>
                  </View>
                </View>
              </View>
            </View>
      )
    });
    const reservasiAkomodasi = this.state.trips[index].reservedAccomodation.map((item) => {
      return(
        <View style={mts.reservationBubble}>
              <Text style={{fontWeight: 'bold'}}>{item.accomodation_name}</Text>
              <Text style={{marginLeft: 10, marginTop: 5, fontSize: 12}}>
                {item.accomodation_place}
              </Text>
              <View
                style={{flexDirection: 'row', marginLeft: 20, marginTop: 5}}>
                {/*Kolom kiri */}
                <View style={{flexDirection: 'column', marginLeft: 25}}>
                  <Text style={{fontSize: 12}}>Check in:</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    {item.checkinDate}
                  </Text>
                </View>
                {/*Kolom kanan */}
                <View style={{flexDirection: 'column', marginLeft: 25}}>
                  <Text style={{fontSize: 12}}>Check out:</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    {item.checkoutDate}
                  </Text>
                </View>
              </View>
            </View>
      )
    });
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
            {reservasiPerjalanan}
          </View>

          {/*Reservasi Hotel */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Reservasi Hotel</Text>
            {reservasiAkomodasi}
          </View>
        </View>
      </ScrollView>
    );
  }
}

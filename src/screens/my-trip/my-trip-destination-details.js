import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity, Modal} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {myTripStyling as mts} from '../../style/my-trip-styling';

//adition
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome5';

//data
import MyData from '../../data-dummy/data.json';

export default class MyTripDestinationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationName: props.route.params,
      trips: MyData.trips,
      transportpopupform: false,
      accomodationpopupform: false,
      newtrip_added: false,
      newaccomodation_added: false,
      transportCode: "",
      hotelCode: ""
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

    const reservasiPerjalananBaru = this.state.trips[index].reservedTransportation.map((item) => {
      return(
        <View style={mts.reservationBubble}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', marginRight: 10}}>
                  DPS - CGK
                </Text>
                <Text>Garuda Indonesia</Text>
              </View>
              {/*Detail pesanan */}
              <View style={{marginLeft: 20, marginTop: 5}}>
                <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                  Min, 30 Agustus 2020
                </Text>
                <View style={{flexDirection: 'row'}}>
                  {/*Kolom kiri */}
                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{fontSize: 12}}>Bali</Text>
                    <Text style={{fontSize: 12}}>
                      Ngurah Rai Intl (DPS)
                    </Text>
                    <Text style={{fontSize: 12}}>Berangkat 18.00</Text>
                  </View>
                  {/*Kolom kanan */}
                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{fontSize: 12}}>Jakarta</Text>
                    <Text style={{fontSize: 12}}>Soekarno Hatta Intl (CGK)</Text>
                    <Text style={{fontSize: 12}}>Tiba 19.00</Text>
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

    const reservasiAkomodasiBaru = this.state.trips[index].reservedAccomodation.map((item) => {
      return(
        <View style={mts.reservationBubble}>
              <Text style={{fontWeight: 'bold'}}>Harris Hotel</Text>
              <Text style={{marginLeft: 10, marginTop: 5, fontSize: 12}}>
                Jalan Pariwangan No 16
              </Text>
              <View
                style={{flexDirection: 'row', marginLeft: 20, marginTop: 5}}>
                {/*Kolom kiri */}
                <View style={{flexDirection: 'column', marginLeft: 25}}>
                  <Text style={{fontSize: 12}}>Check in:</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Kam, 27 Agu 2020
                  </Text>
                </View>
                {/*Kolom kanan */}
                <View style={{flexDirection: 'column', marginLeft: 25}}>
                  <Text style={{fontSize: 12}}>Check out:</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>
                    Min, 30 Agu 2020
                  </Text>
                </View>
              </View>
            </View>
      )
    });
    return (
      <ScrollView>
        {this.state.newtrip_added ? (
          <>
          {this.state.newaccomodation_added ? (
            <View style={[ats.mainContainer, {alignItems: 'center'}]}>
          {/*Section Gambar dengan black overlay */}
          <View>
            <Image
              source={{
                uri:
                  this.state.trips[index].image
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
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
            <Text style={gs.cardTitle}>Reservasi Perjalanan</Text>
            </View>
            
            {reservasiPerjalanan}
            {reservasiPerjalananBaru}
            <View style={[mts.reservationBubble, {alignItems:'center', backgroundColor: 'white'}]}>
              <TouchableOpacity onPress={() => this.setState({transportpopupform: true})}>
                <Text style={{color:Color.color2, fontWeight:'bold'}}>Tambah reservasi +</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*Reservasi Hotel */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Reservasi Hotel</Text>
            {reservasiAkomodasi}
            {reservasiAkomodasiBaru}
            <View style={[mts.reservationBubble, {alignItems:'center', backgroundColor: 'white'}]}>
            <TouchableOpacity onPress={() => this.setState({accomodationpopupform: true})}>
                <Text style={{color:Color.color2, fontWeight:'bold'}}>Tambah reservasi +</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          ) : (
            <View style={[ats.mainContainer, {alignItems: 'center'}]}>
          {/*Section Gambar dengan black overlay */}
          <View>
            <Image
              source={{
                uri:
                  this.state.trips[index].image
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
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
            <Text style={gs.cardTitle}>Reservasi Perjalanan</Text>
            </View>
            
            {reservasiPerjalanan}
            {reservasiPerjalananBaru}
            <View style={[mts.reservationBubble, {alignItems:'center', backgroundColor: 'white'}]}>
              <TouchableOpacity onPress={() => this.setState({transportpopupform: true})}>
                <Text style={{color:Color.color2, fontWeight:'bold'}}>Tambah reservasi +</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*Reservasi Hotel */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Reservasi Hotel</Text>
            {reservasiAkomodasi}
            <View style={[mts.reservationBubble, {alignItems:'center', backgroundColor: 'white'}]}>
            <TouchableOpacity onPress={() => this.setState({accomodationpopupform: true})}>
                <Text style={{color:Color.color2, fontWeight:'bold'}}>Tambah reservasi +</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          )}
          </>
        ) : (
          <>
          {this.state.newaccomodation_added ? (
            <View style={[ats.mainContainer, {alignItems: 'center'}]}>
            {/*Section Gambar dengan black overlay */}
            <View>
              <Image
                source={{
                  uri:
                    this.state.trips[index].image
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
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
              <Text style={gs.cardTitle}>Reservasi Perjalanan</Text>
              </View>
              
              {reservasiPerjalanan}
              <View style={[mts.reservationBubble, {alignItems:'center', backgroundColor: 'white'}]}>
                <TouchableOpacity onPress={() => this.setState({transportpopupform: true})}>
                  <Text style={{color:Color.color2, fontWeight:'bold'}}>Tambah reservasi +</Text>
                </TouchableOpacity>
              </View>
            </View>
  
            {/*Reservasi Hotel */}
            <View style={[gs.cardSection, {marginTop: 20}]}>
              <Text style={gs.cardTitle}>Reservasi Hotel</Text>
              {reservasiAkomodasi}
              {reservasiAkomodasiBaru}
              <View style={[mts.reservationBubble, {alignItems:'center', backgroundColor: 'white'}]}>
              <TouchableOpacity onPress={() => this.setState({accomodationpopupform: true})}>
                  <Text style={{color:Color.color2, fontWeight:'bold'}}>Tambah reservasi +</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          ) : (
            <View style={[ats.mainContainer, {alignItems: 'center'}]}>
          {/*Section Gambar dengan black overlay */}
          <View>
            <Image
              source={{
                uri:
                  this.state.trips[index].image
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
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
            <Text style={gs.cardTitle}>Reservasi Perjalanan</Text>
            </View>
            
            {reservasiPerjalanan}
            <View style={[mts.reservationBubble, {alignItems:'center', backgroundColor: 'white'}]}>
              <TouchableOpacity onPress={() => this.setState({transportpopupform: true})}>
                <Text style={{color:Color.color2, fontWeight:'bold'}}>Tambah reservasi +</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/*Reservasi Hotel */}
          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>Reservasi Hotel</Text>
            {reservasiAkomodasi}
            <View style={[mts.reservationBubble, {alignItems:'center', backgroundColor: 'white'}]}>
            <TouchableOpacity onPress={() => this.setState({accomodationpopupform: true})}>
                <Text style={{color:Color.color2, fontWeight:'bold'}}>Tambah reservasi +</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
          )}
          </>
        )}
        

        <Modal transparent={true} visible={this.state.transportpopupform}>
          <View style={ats.modalOverlay}>
            <View style={[ats.modal2Container, {alignItems:'flex-start'}]}>
              <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                <Text style={ats.textMediumColor4}>Tambah tiket perjalanan</Text>
                <TouchableOpacity onPress={()=> this.setState({transportpopupform:false})}>
                  <Icon name={'times'} size={16}/>
                </TouchableOpacity>
                
              </View>
              
              <View style={{flexDirection:'row', marginTop:10, justifyContent:'center'}}>
                <Text style={ats.textMediumBoldColor4AlignCenter}>
                  Kode booking:
                </Text>
                <TextInput
                      style={[mts.textInput, {width: '50%', marginLeft: 10}]}
                      placeholder={'ketik disini'}
                      onChangeText={(value) =>
                        this.setState({transportCode: value})
                      }
                />
              </View>
              
              <View style={{alignItems:'center', width: '100%'}}>
              
              <TouchableOpacity
                style={ats.btn}
                onPress={() => {
                  this.setState({
                    newtrip_added: true,
                    transportpopupform: false,
                  });
                }}>
                <Text style={ats.btnText}> Tambah </Text>
              </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </Modal>

        <Modal transparent={true} visible={this.state.accomodationpopupform}>
          <View style={ats.modalOverlay}>
            <View style={[ats.modal2Container, {alignItems:'flex-start'}]}>
              <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                <Text style={ats.textMediumColor4}>Tambah reservasi hotel</Text>
                <TouchableOpacity onPress={()=> this.setState({accomodationpopupform:false})}>
                  <Icon name={'times'} size={16}/>
                </TouchableOpacity>
                
              </View>
              
              <View style={{flexDirection:'row', marginTop:10, justifyContent:'center'}}>
                <Text style={ats.textMediumBoldColor4AlignCenter}>
                  Kode booking:
                </Text>
                <TextInput
                      style={[mts.textInput, {width: '50%', marginLeft: 10}]}
                      placeholder={'ketik disini'}
                      onChangeText={(value) =>
                        this.setState({hotelCode: value})
                      }
                />
              </View>
              
              <View style={{alignItems:'center', width: '100%'}}>
              
              <TouchableOpacity
                style={ats.btn}
                onPress={() => {
                  this.setState({
                    newaccomodation_added: true,
                    accomodationpopupform: false,
                  });
                }}>
                <Text style={ats.btnText}> Tambah </Text>
              </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </Modal>
      </ScrollView>
      
    );
  }
}

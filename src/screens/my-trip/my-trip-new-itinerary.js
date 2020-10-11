import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {myTripStyling as mts} from '../../style/my-trip-styling';
import {ticketStyling as ts} from '../../style/ticket-styling';

//adition
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class MyTripNewItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  UNSAFE_componentWillMount = () => {};

  render() {
    return (
      <ScrollView>
        <View style={[gs.mainContainer, {justifyContent: 'flex-start'}]}>
          <View
            style={{alignItems: 'flex-end', width: '100%', marginBottom: 30}}>
            <TouchableOpacity
              style={[ts.pesanButton, {borderRadius: 5, marginRight: 30}]}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Simpan</Text>
            </TouchableOpacity>
          </View>

          <View style={ats.searchBoxContainer}>
            <View style={ats.searchBox}>
              <TextInput
                autoCorrect={false}
                style={ats.searchBoxTextInput}
                placeholder={'Tujuan objek wisata'}
                onChangeText={this.changeText}
                onEndEditing={this.handleSearch}
                ref={(input) => {
                  this.state.search = input;
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  'Attraction Search Results',
                  this.state.search,
                )
              }>
              <Icon
                style={{marginRight: 5}}
                name={'search'}
                size={18}
                color={Color.color2}
              />
            </TouchableOpacity>
          </View>

          <View style={[gs.cardSection, {marginTop: 30}]}>
            {/*Destinasi pertama */}
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: Color.color3,
                height: 140,
                marginBottom: 12,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 10,
                }}>
                <Image
                  style={[mts.squareImage, {}]}
                  source={{
                    uri:
                      'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                    width: 190,
                  }}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    Pura Gunung Kawi
                  </Text>
                  <Text style={{fontSize: 12, marginTop: 5}}>
                    Candi Tebing Kawi adalah situs purbakala yang dilindungi di
                    Bali. Terletak di Sungai Pakerisan
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      style={{marginRight: 5}}
                      name={'clock-o'}
                      size={16}
                      color={'black'}
                    />
                    <Text style={{fontSize: 10}}>4-6 Hari</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      style={{marginRight: 5}}
                      name={'money'}
                      size={16}
                      color={'black'}
                    />
                    <Text style={{fontSize: 10}}>600.000 - 800.000</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/*Destinasi kedua */}
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: Color.color3,
                height: 140,
                marginBottom: 12,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 10,
                }}>
                <Image
                  style={[mts.squareImage, {}]}
                  source={{
                    uri:
                      'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                    width: 190,
                  }}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    Pura Gunung Kawi
                  </Text>
                  <Text style={{fontSize: 12, marginTop: 5}}>
                    Candi Tebing Kawi adalah situs purbakala yang dilindungi di
                    Bali. Terletak di Sungai Pakerisan
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      style={{marginRight: 5}}
                      name={'clock-o'}
                      size={16}
                      color={'black'}
                    />
                    <Text style={{fontSize: 10}}>4-6 Hari</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      style={{marginRight: 5}}
                      name={'money'}
                      size={16}
                      color={'black'}
                    />
                    <Text style={{fontSize: 10}}>600.000 - 800.000</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            {/*Destinasi ketiga */}
            <TouchableOpacity
              style={{
                borderRadius: 5,
                backgroundColor: Color.color3,
                height: 140,
                marginBottom: 12,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  margin: 10,
                }}>
                <Image
                  style={[mts.squareImage, {}]}
                  source={{
                    uri:
                      'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 10,
                    width: 190,
                  }}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                    Pura Gunung Kawi
                  </Text>
                  <Text style={{fontSize: 12, marginTop: 5}}>
                    Candi Tebing Kawi adalah situs purbakala yang dilindungi di
                    Bali. Terletak di Sungai Pakerisan
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      style={{marginRight: 5}}
                      name={'clock-o'}
                      size={16}
                      color={'black'}
                    />
                    <Text style={{fontSize: 10}}>4-6 Hari</Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Icon
                      style={{marginRight: 5}}
                      name={'money'}
                      size={16}
                      color={'black'}
                    />
                    <Text style={{fontSize: 10}}>600.000 - 800.000</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

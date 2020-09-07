import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

// Style
import {globalStyling as gs} from '../../style/global-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import data from '../../data-dummy/data.json';

export default class ProfileHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      dataSource: data.profil,
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={[gs.mainContainer]}>
          <View style={ps.backgroundContainer}>
            <View style={ps.pictureContainer}>
              <Image
                source={require('../../picture.png')}
                style={ps.CircleShape}
              />
            </View>

            <View style={ps.detailContainer}>
              <Text style={ps.bubbleTitleText}>Nama Depan</Text>
              <View style={ps.bubble}>
                <Text style={ps.bubbleText}>
                  {this.state.dataSource.namaDepan}
                </Text>
              </View>
            </View>

            <View style={ps.detailContainer}>
              <Text style={ps.bubbleTitleText}>Nama Belakang</Text>
              <View style={ps.bubble}>
                <Text style={ps.bubbleText}>
                  {this.state.dataSource.namaBelakang}
                </Text>
              </View>
            </View>

            <View style={ps.detailContainer}>
              <Text style={ps.bubbleTitleText}>Tanggal Lahir</Text>
              <View style={ps.bubble}>
                <Text style={ps.bubbleText}>
                  {this.state.dataSource.tanggalLahir}
                </Text>
              </View>
            </View>

            <View style={ps.detailContainer}>
              <Text style={ps.bubbleTitleText}>Jenis Kelamin</Text>
              <View style={ps.bubble}>
                <Text style={ps.bubbleText}>
                  {this.state.dataSource.jenisKelamin}
                </Text>
              </View>
            </View>

            <View style={ps.detailContainer}>
              <Text style={ps.bubbleTitleText}></Text>
              <TouchableOpacity
                style={ps.bubblePreferensi}
                onPress={() =>
                  this.props.navigation.navigate('PreferensiObjekWisata')
                }>
                <Text style={ps.bubblePreferensiText}>
                  Preferensi Objek Wisata
                </Text>
                <Icon
                  name={'chevron-right'}
                  size={20}
                  color={'black'}
                  style={ps.bubbleArrowIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={ps.detailContainer}>
              <Text style={ps.bubbleTitleText}></Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('PreferensiAkomodasi')
                }
                style={ps.bubblePreferensi}>
                <Text style={ps.bubblePreferensiText}>
                  Preferensi Akomodasi
                </Text>
                <Icon
                  name={'chevron-right'}
                  size={20}
                  color={'black'}
                  style={ps.bubbleArrowIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={ps.detailContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ProfileEdit')}
                style={ps.btn}>
                <Text style={ps.btnText}>Edit Profil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

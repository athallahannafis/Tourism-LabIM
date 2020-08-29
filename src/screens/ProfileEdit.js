import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

// Style
import {globalStyling as gs} from '../style/global-styling';
import {profilStyling as ps} from '../style/profil-styling';
import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-community/picker';
import moment from 'moment';

import data from '../data-dummy/data.json';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      isVisible: false,
      textBeforeVisible: true,
      textAfterVisible: false,
      chosenDate: '',
      selectedValue: '',
      bornDate: 0,
      bornMonth: 0,
      bornYear: 0,
      tanggalLahir: '',
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      dataSource: data.profil,
      tanggalLahir: data.profil.tanggalLahir,
      selectedValue: data.profil.jenisKelamin,
      bornYear: Number(data.profil.tanggalLahir.split(' ')[2]),
      bornDate: Number(data.profil.tanggalLahir.split(' ')[0]),
    });
    this.setMonth(data.profil.tanggalLahir.split(' ')[1]);
  }

  setMonth = (month) => {
    if (month === 'Januari') {
      this.setState({
        bornMonth: 0,
      });
    } else if (month === 'Februari') {
      this.setState({
        bornMonth: 1,
      });
    } else if (month === 'Maret') {
      this.setState({
        bornMonth: 2,
      });
    } else if (month === 'April') {
      this.setState({
        bornMonth: 3,
      });
    } else if (month === 'Mei') {
      this.setState({
        bornMonth: 4,
      });
    } else if (month === 'Juni') {
      this.setState({
        bornMonth: 5,
      });
    } else if (month === 'Juli') {
      this.setState({
        bornMonth: 6,
      });
    } else if (month === 'Agustus') {
      this.setState({
        bornMonth: 7,
      });
    } else if (month === 'September') {
      this.setState({
        bornMonth: 8,
      });
    } else if (month === 'Oktober') {
      this.setState({
        bornMonth: 9,
      });
    } else if (month === 'November') {
      this.setState({
        bornMonth: 10,
      });
    } else if (month === 'Desember') {
      this.setState({
        bornMonth: 11,
      });
    } else {
      this.setState({
        bornMonth: 100,
      });
    }
  };

  handlePicker = (date) => {
    this.setState({
      isVisible: false,
      tanggalLahir: moment(date).format('DD MMMM YYYY'),
    });
    const newChosenDate = moment(date).format('DD MMMM YYYY');
    this.setChosenDate(newChosenDate);
  };

  setChosenDate = (date) => {
    const day = date.split(' ')[0];
    const month = date.split(' ')[1];
    const year = date.split(' ')[2];
    this.setState({
      bornDate: Number(day),
      bornYear: Number(year),
    });
    if (month === 'January') {
      this.setState({
        chosenDate: day + ' Januari ' + year,
        bornMonth: 0,
      });
    } else if (month === 'February') {
      this.setState({
        chosenDate: day + ' Februari ' + year,
        bornMonth: 1,
      });
    } else if (month === 'March') {
      this.setState({
        chosenDate: day + ' Maret ' + year,
        bornMonth: 2,
      });
    } else if (month === 'April') {
      this.setState({
        bornMonth: 3,
      });
    } else if (month === 'May') {
      this.setState({
        chosenDate: day + ' Mei ' + year,
        bornMonth: 4,
      });
    } else if (month === 'June') {
      this.setState({
        chosenDate: day + ' Juni ' + year,
        bornMonth: 5,
      });
    } else if (month === 'July') {
      this.setState({
        chosenDate: day + ' Juli ' + year,
        bornMonth: 6,
      });
    } else if (month === 'August') {
      this.setState({
        chosenDate: day + ' Agustus ' + year,
        bornMonth: 7,
      });
    } else if (month === 'September') {
      this.setState({
        bornMonth: 8,
      });
    } else if (month === 'October') {
      this.setState({
        chosenDate: day + ' Oktober ' + year,
        bornMonth: 9,
      });
    } else if (month === 'November') {
      this.setState({
        bornMonth: 10,
      });
    } else if (month === 'December') {
      this.setState({
        chosenDate: day + ' Desember ' + year,
        bornMonth: 11,
      });
    } else {
      this.setState({
        chosenDate: chosenDate,
      });
    }
  };

  showPicker = () => {
    this.setState({
      isVisible: true,
      textBeforeVisible: false,
      textAfterVisible: true,
    });
  };

  hidePicker = () => {
    this.setState({
      isVisible: false,
      textBeforeVisible: true,
      textAfterVisible: false,
    });
  };

  setSelectedValue = (value) => {
    this.setState({
      selectedValue: value,
    });
  };

  // setJsonFile = ([newData]) => {
  //   file.set();
  // };

  render() {
    const placeholder = {
      label: 'Select a sport...',
      value: null,
    };

    return (
      <View style={[gs.mainContainer]}>
        <View style={ps.backgroundContainer}>
          <View style={ps.pictureContainer}>
            <Image source={require('../picture.png')} style={ps.CircleShape} />
          </View>

          <View style={ps.detailContainer}>
            <Text style={ps.bubbleTitleText}>Nama Depan</Text>
            <View style={ps.bubble}>
              <TextInput
                style={ps.bubbleTextInput}
                placeholder={'Nama Depan'}
                defaultValue={this.state.dataSource.namaDepan}
                onChangeText={(newNamaDepan) => this.setState({newNamaDepan})}
              />
            </View>
          </View>

          <View style={ps.detailContainer}>
            <Text style={ps.bubbleTitleText}>Nama Belakang</Text>
            <View style={ps.bubble}>
              <TextInput
                style={ps.bubbleTextInput}
                placeholder={'Nama Belakang'}
                defaultValue={this.state.dataSource.namaBelakang}
              />
            </View>
          </View>

          <View style={ps.detailContainer}>
            <Text style={ps.bubbleTitleText}>Tanggal Lahir</Text>
            <View style={ps.bubble}>
              {/* Tulisan untuk initial date (sebelum buka kalender)*/}
              <TouchableOpacity onPress={this.showPicker}>
                {this.state.textBeforeVisible ? (
                  <Text style={ps.bubbleTextInput}>
                    {this.state.tanggalLahir}
                  </Text>
                ) : null}
              </TouchableOpacity>

              {/* Tulisan setelah memilih tanggal di kalender*/}
              {this.state.textAfterVisible ? (
                <Text onPress={this.showPicker} style={ps.bubbleTextInput}>
                  {this.state.chosenDate}
                </Text>
              ) : null}

              {/* Kalender */}
              <DateTimePicker
                date={
                  new Date(
                    this.state.bornYear,
                    this.state.bornMonth,
                    this.state.bornDate,
                  )
                } //nanti diganti yaa
                isVisible={this.state.isVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                mode={'date'}
              />
            </View>
          </View>

          <View style={ps.detailContainer}>
            <Text style={ps.bubbleTitleText}>Jenis Kelamin</Text>
            <View style={ps.bubble}>
              {/* Dropdown untuk memilih Jenis Kelamin */}
              <Picker
                selectedValue={this.state.selectedValue}
                style={ps.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setSelectedValue(itemValue)
                }>
                <Picker.Item label="Laki-laki" value="Laki-laki" />
                <Picker.Item label="Perempuan" value="Perempuan" />
              </Picker>
            </View>
          </View>

          <View style={ps.detailContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ProfileHome')}
              style={ps.btn}>
              <Text style={ps.btnText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

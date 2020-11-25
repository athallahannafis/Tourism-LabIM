import React, {Component} from 'react';
import {View, Text, Image, Modal, TouchableOpacity, Dimensions} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

// data
import AllAttraction from '../../data-dummy/attraction-data/attraction.json';

export default class MyTripItinerarySearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedPlace: '',
      destinationName: '',
      destinationData: [],
      popularDestinationData: [],
      cityDestinationData: [],
      lastTouristAtt: [],
      empty: false,
      filter: false,
      filterPopUp: false,
      isLoading: true,
      wisata_alam: false,
      tantangan: false,
      budaya_lokal: false,
      kuliner: false,
      perbelanjaan: false,
    };
  }

  UNSAFE_componentWillMount = () => {
    this.state.searchedPlace = this.props.route.params.key;
    console.log(this.state.searchedPlace);
    this.state.destinationName = this.props.route.params.destinationName;
    console.log(this.state.destinationName);
    let searchedLowerCase = this.state.searchedPlace.toLowerCase();
    this.fetchAttraction(searchedLowerCase);
  };

  componentDidMount() {
    this.setState({
      isLoading: false,
      wisata_alam: false,
      tantangan: false,
      budaya_lokal: false,
      kuliner: false,
      perbelanjaan: false,
    });
  }

  fetchAttraction = (searchedPlace) => {
    let the_data = [];
    for (let i=0; i<AllAttraction.data.length; i++){
        if (AllAttraction.data[i].attraction_place == this.state.destinationName){
          the_data = AllAttraction.data[i].attraction_list;
        }
      }
    let filteredDestination = [];
    //Terdapat 2 kali for-loop yang berjalan menelusuri setiap item di the_data.
    //For-loop dilakukan 2 kali agar urutan destinasi/tempat hasil pencarian yang keluar sesuai prioritas, yaitu:
    //misal keyword: "An"
    //Prioritas 1: destinasi yang mengandung keyword, misal "Gili Trawang(an)"
    //Prioritas 2: destinasi di kota administrasi/provinsi yang mengandung keyword, misal "Jakarta Selat(an)"

    //jika keyword bagian dari nama tempat/destinasi misal "Monas"
    //Prioritas Satu
      attr_list = the_data;
      for (let l = 0; l < attr_list.length; l++) {
        if (attr_list[l].place_name.toLowerCase().includes(searchedPlace)) {

          //jika user memasukan filter pencarian
          if (this.state.filter === true) {
            if (
              (attr_list[l].categories.wisata_alam === this.state.wisata_alam) |
              (attr_list[l].categories.tantangan === this.state.tantangan) |
              (attr_list[l].categories.budaya_lokal ===
                this.state.budaya_lokal) |
              (attr_list[l].categories.kuliner === this.state.kuliner) |
              (attr_list[l].categories.perbelanjaan === this.state.perbelanjaan)
            ) {
              filteredDestination.push(attr_list[l]);
            }
          }
          //jika user tidak memasukan filter pencarian, destinasi dianggap lolos filter-checking
          else {
            console.log('masuk A ');
            filteredDestination.push(attr_list[l]);
          }

          //cek apakah destinasi yang lolos filter-checking sudah ada di dalam destinationData list,
          //Jika sudah ada, tidak dimasukkan lagi ke dalam list supaya tidak ada duplikasi
          //Jika tidak ada, masukkan ke dalam list
          for (let z = 0; z < filteredDestination.length; z++) {
            if (!this.state.destinationData.includes(filteredDestination[z])) {
              console.log('masuk A lagi');
              this.state.destinationData.push(filteredDestination[z]);
              //jika tempat tersebut popular, maka masuk ke list popularDestinationData biar cardnya dibedain di UI nya
              if (filteredDestination[z].isPopular === true) {
                this.state.popularDestinationData.push(filteredDestination[z]);
              }
            }
          }
        }
      }

    //jika keyword bagian dari city_name / province misal "Teng" atau "Sulawesi Tenggara"
    //Prioritas 2
      attr_list = the_data;
      for (let l = 0; l < attr_list.length; l++) {
        if (attr_list[l].city_name.toLowerCase().includes(searchedPlace)) {

          if (this.state.filter === true) {
            if (
              (attr_list[l].categories.wisata_alam === this.state.wisata_alam) |
              (attr_list[l].categories.tantangan === this.state.tantangan) |
              (attr_list[l].categories.budaya_lokal ===
                this.state.budaya_lokal) |
              (attr_list[l].categories.kuliner === this.state.kuliner) |
              (attr_list[l].categories.perbelanjaan === this.state.perbelanjaan)
            ) {
              filteredDestination.push(attr_list[l]);
            }
          } else {
            console.log('masuk C');
            filteredDestination.push(attr_list[l]);
          }

          for (let y = 0; y < filteredDestination.length; y++) {
            if (!this.state.destinationData.includes(filteredDestination[y])) {
              console.log('masuk C lagi');
              this.state.destinationData.push(filteredDestination[y]);
              if (filteredDestination[y].isPopular === true) {
                this.state.popularDestinationData.push(filteredDestination[y]);
              }
            }
          }
        }
    }
  };

  saveSearchFilter = () => {
    console.log('pressed');
    this.state.filterPopUp = false;
    this.UNSAFE_componentWillMount();
  };

  render() {
    this.fetchAttraction(this.state.searchedPlace.toLowerCase());

    const objekWisataRender = this.state.destinationData.map((item) => {
      if (item.isPopular === false) {
        const len = this.state.destinationData.length;
        if (item === this.state.destinationData[len - 1]) {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Attraction Details', item)
                }>
                <View style={[gs.rowContainer, {paddingVertical: 20}]}>
                  {/* Left section */}
                  <View style={[gs.rowContainer, {width: 100}]}>
                    <Image
                      source={{uri: item.image_source}}
                      style={gs.smallImage}
                    />
                  </View>
                  {/* Right section */}
                  <View style={[{width: 230, marginLeft: 20}]}>
                    <Text style={gs.subCardTitle}>{item.place_name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.city_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        } else {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Attraction Details', item)
                }>
                <View style={[gs.rowContainer, {paddingVertical: 20}]}>
                  {/* Left section */}
                  <View style={[gs.rowContainer, {width: 100}]}>
                    <Image
                      source={{uri: item.image_source}}
                      style={gs.smallImage}
                    />
                  </View>
                  {/* Right section */}
                  <View style={[{width: 230, marginLeft: 20}]}>
                    <Text style={gs.subCardTitle}>{item.place_name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.city_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{borderBottomWidth: 1, borderColor: Color.color1}}></View>
            </>
          );
        }
      } else {
        return null;
      }
    });

    const wisataPopulerRender = this.state.popularDestinationData.map(
      (item) => {
        const len = this.state.popularDestinationData.length;
        if (item === this.state.popularDestinationData[len - 1]) {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Attraction Details', item)
                }>
                <View style={[gs.rowContainer, {paddingVertical: 20}]}>
                  {/* Left section */}
                  <View style={[gs.rowContainer, {width: 100}]}>
                    <Image
                      source={{uri: item.image_source}}
                      style={gs.smallImage}
                    />
                  </View>
                  {/* Right section */}
                  <View style={[{width: 230, marginLeft: 20}]}>
                    <Text style={gs.subCardTitle}>{item.place_name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.city_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        } else {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Attraction Details', item)
                }>
                <View style={[gs.rowContainer, {paddingVertical: 20}]}>
                  {/* Left section */}
                  <View style={[gs.rowContainer, {width: 100}]}>
                    <Image
                      source={{uri: item.image_source}}
                      style={gs.smallImage}
                    />
                  </View>
                  {/* Right section */}
                  <View style={[{width: 230, marginLeft: 20}]}>
                    <Text style={gs.subCardTitle}>{item.place_name}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.city_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{borderBottomWidth: 1, borderColor: Color.color1}}></View>
            </>
          );
        }
      },
    );

    return (
      <>
        <ScrollView>
          <View style={[gs.mainContainer, {height: Dimensions.get('window').height, justifyContent:'flex-start'}]}>
            <View style={ats.filterBoxContainer}>
              <Text>Filter Pencarian</Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({filterPopUp: true});
                }}>
                <Icon
                  style={{marginRight: 5, marginLeft: 10}}
                  name={'filter'}
                  size={18}
                  color={Color.color2}
                />
              </TouchableOpacity>
            </View>
            <View style={[gs.cardSection, {marginTop: 20}]}>
              <Text style={gs.cardTitle}>Objek Wisata Populer</Text>
              {wisataPopulerRender}
            </View>
            <View style={[gs.cardSection, {marginTop: 20}]}>
              <Text style={gs.cardTitle}>
                Objek Wisata terkait '{this.state.searchedPlace}'
              </Text>
              <View>{objekWisataRender}</View>
            </View>
          </View>
        </ScrollView>
        {/*Pop up untuk memilih filter pencarian jika icon filter diklik */}
        <Modal transparent={true} visible={this.state.filterPopUp}>
          <View style={ats.modalOverlay}>
            <View style={ats.modal4Container}>
              <View style={gs.closeIcon}>
                <TouchableOpacity
                  onPress={() => this.setState({filterPopUp: false})}>
                  <Icon
                    style={{marginRight: 5}}
                    name={'close'}
                    size={18}
                    color={Color.color6}
                  />
                </TouchableOpacity>
              </View>
              <View style={ps.titleContainer}>
                <Text style={ps.fontJudul2}>Filter Pencarian</Text>
              </View>

              <View style={ats.checkListContainer}>
                <View style={ps.checkItemContainer}>
                  <CheckBox
                    value={this.state.wisata_alam}
                    onValueChange={(value) =>
                      this.setState({wisata_alam: value})
                    }
                  />
                  <Text style={ps.fontCheckList}>Wisata Alam</Text>
                </View>

                <View style={ps.checkItemContainer}>
                  <CheckBox
                    value={this.state.tantangan}
                    onValueChange={(value) => this.setState({tantangan: value})}
                  />
                  <Text style={ps.fontCheckList}>Tantangan</Text>
                </View>

                <View style={ps.checkItemContainer}>
                  <CheckBox
                    value={this.state.budaya_lokal}
                    onValueChange={(value) =>
                      this.setState({budaya_lokal: value})
                    }
                  />
                  <Text style={ps.fontCheckList}>Budaya Lokal</Text>
                </View>

                <View style={ps.checkItemContainer}>
                  <CheckBox
                    value={this.state.kuliner}
                    onValueChange={(value) => this.setState({kuliner: value})}
                  />
                  <Text style={ps.fontCheckList}>Kuliner</Text>
                </View>

                <View style={ps.checkItemContainer}>
                  <CheckBox
                    value={this.state.perbelanjaan}
                    onValueChange={(value) =>
                      this.setState({perbelanjaan: value})
                    }
                  />
                  <Text style={ps.fontCheckList}>Perbelanjaan</Text>
                </View>
                <TouchableOpacity
                  style={[ats.btn]}
                  onPress={() => this.setState({filterPopUp: false})}>
                  <Text style={ats.btnText}> Tutup </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

import React, {Component} from 'react';
import {View, Text, Image, Modal} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native-gesture-handler';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

// data
import AllAttraction from '../../data-dummy/attraction-data/attraction.json';

export default class AttractionInDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedPlace: '',
      destinationData: [],
      popularDestinationData: [],
      cityDestinationData: [],
      lastTouristAtt: [],
      empty: false,
      filter: false,
      filterPopUp: false,
      wisata_alam: false,
      tantangan: false,
      budaya_lokal: false,
      kuliner: false,
      perbelanjaan: false,
    };
  }

  UNSAFE_componentWillMount = () => {
    this.state.searchedPlace = this.props.route.params;
    let searchedLowerCase = this.state.searchedPlace.toLowerCase();
    this.fetchAttraction(searchedLowerCase);
  };

  fetchAttraction = (searchedPlace) => {
    console.log(searchedPlace);
    console.log('--------------------------------');
    let the_data = AllAttraction.data;
    let filteredDestination = [];

    //Terdapat 3 kali for-loop yang berjalan menelusuri setiap item di the_data.
    //For-loop dilakukan 3 kali agar urutan destinasi/tempat hasil pencarian yang keluar sesuai prioritas, yaitu:
    //misal keyword: "An"
    //Prioritas 1: destinasi yang mengandung keyword, misal "Gili Trawang(an)"
    //Prioritas 2: destinasi di kota yang mengandung keyword, misal "B(an)dung"
    //Prioritas 3: destinasi di kota administrasi/provinsi yang mengandung keyword, misal "Jakarta Selat(an)"

    //jika keyword bagian dari nama tempat/destinasi misal "Monas"
    //Prioritas Satu
    for (let i = 0; i < the_data.length; i++) {
      attr_list = the_data[i].attraction_list;
      for (let l = 0; l < attr_list.length; l++) {
        if (attr_list[l].place_name.toLowerCase().includes(searchedPlace)) {
          //masukan nama kota dari destinasi tersebut ke list cityDestinationData agar kota bisa ditampilkan di bagian "Destinasi"
          if (!this.state.cityDestinationData.includes(the_data[i])) {
            this.state.cityDestinationData.push(the_data[i]);
          }

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
    }

    //jika keyword bagian dari nama kota misal "Jakarta" atau "Jak"
    //Prioritas 2
    for (let i = 0; i < the_data.length; i++) {
      attr_list = the_data[i].attraction_list;
      if (the_data[i].attraction_place.toLowerCase().includes(searchedPlace)) {
        if (!this.state.cityDestinationData.includes(the_data[i])) {
          this.state.cityDestinationData.push(the_data[i]);
        }
        for (let j = 0; j < attr_list.length; j++) {
          if (this.state.filter === true) {
            if (
              (attr_list[l].categories.wisata_alam === this.state.wisata_alam) |
              (attr_list[l].categories.tantangan === this.state.tantangan) |
              (attr_list[l].categories.budaya_lokal ===
                this.state.budaya_lokal) |
              (attr_list[l].categories.kuliner === this.state.kuliner) |
              (attr_list[l].categories.perbelanjaan === this.state.perbelanjaan)
            ) {
              filteredDestination.push(attr_list[j]);
            }
          } else {
            console.log('masuk B ');
            filteredDestination.push(attr_list[j]);
          }

          for (let x = 0; x < filteredDestination.length; x++) {
            if (!this.state.destinationData.includes(filteredDestination[x])) {
              console.log('masuk B lagi');
              this.state.destinationData.push(filteredDestination[x]);
              if (filteredDestination[x].isPopular === true) {
                this.state.popularDestinationData.push(filteredDestination[x]);
              }
            }
          }
        }
      }
    }

    //jika keyword bagian dari city_name / province misal "Teng" atau "Sulawesi Tenggara"
    //Prioritas 3
    for (let i = 0; i < the_data.length; i++) {
      attr_list = the_data[i].attraction_list;
      for (let l = 0; l < attr_list.length; l++) {
        if (attr_list[l].city_name.toLowerCase().includes(searchedPlace)) {
          if (!this.state.cityDestinationData.includes(the_data[i])) {
            this.state.cityDestinationData.push(the_data[i]);
          }

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
    }
  };

  render() {
    const destinasiRender = this.state.cityDestinationData.map((item) => {
      const imageURL = item.attraction_list[1].image_source;
      const len = this.state.cityDestinationData.length;
      if (item === this.state.cityDestinationData[len - 1]) {
        return (
          <>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(
                  'Attraction in Destination',
                  item.attraction_place,
                )
              }>
              <View style={[gs.rowContainer, {paddingVertical: 20}]}>
                {/* Left section */}
                <View style={[gs.rowContainer, {width: 100}]}>
                  <Image source={{uri: imageURL}} style={gs.smallImage} />
                </View>
                {/* Right section */}
                <View style={[{width: 230, marginLeft: 20}]}>
                  <Text style={gs.subCardTitle}>{item.attraction_place}</Text>
                  <Text>{item.attraction_place_description}</Text>
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
                this.props.navigation.navigate(
                  'Attraction in Destination',
                  item.attraction_place,
                )
              }>
              <View style={[gs.rowContainer, {paddingVertical: 20}]}>
                {/* Left section */}
                <View style={[gs.rowContainer, {width: 100}]}>
                  <Image source={{uri: imageURL}} style={gs.smallImage} />
                </View>
                {/* Right section */}
                <View style={[{width: 230, marginLeft: 20}]}>
                  <Text style={gs.subCardTitle}>{item.attraction_place}</Text>
                  <Text>{item.attraction_place_description}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{borderBottomWidth: 1}}></View>
          </>
        );
      }
    });

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
              <View style={{borderBottomWidth: 1}}></View>
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
              <View style={{borderBottomWidth: 1}}></View>
            </>
          );
        }
      },
    );

    return (
      <>
        <ScrollView>
          <View style={gs.mainContainer}>
            <View style={ats.searchBoxContainer}>
              <TouchableOpacity>
                <Icon
                  style={{marginRight: 5}}
                  name={'search'}
                  size={18}
                  color={Color.color2}
                />
              </TouchableOpacity>

              <View style={ats.searchBox}>
                <TextInput
                  autoCorrect={false}
                  style={ats.searchBoxTextInput}
                  placeholder={'Search...'}
                  value={this.state.searchedPlace}
                  // onChangeText={this.changeText}
                  // onEndEditing={this.handleSearch}
                  // ref={(input) => {
                  //   this.state.search = input;
                  // }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({filterPopUp: true});
                }}>
                <Icon
                  style={{marginRight: 5}}
                  name={'filter'}
                  size={18}
                  color={Color.color2}
                />
              </TouchableOpacity>
            </View>
            <View style={[gs.cardSection]}>
              <Text style={gs.cardTitle}>Destinasi</Text>
              <View>{destinasiRender}</View>
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
              <View
                style={{
                  alignItems: 'flex-end',
                  width: '100%',
                }}>
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
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

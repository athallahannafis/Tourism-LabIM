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
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class MyTripHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationValue: '',
      dateStartValue: null,
      dateEndValue: null,
      dateStartTextValue: 'Tanggal mulai',
      dateEndTextValue: 'Tanggal selesai',
      addNewDestinationPopUp: false,
      dateStartVisible: false,
      dateEndVisible: false,
      destinationName1: 'Jakarta',
      destinationName2: 'Bali',
    };
  }

  // methods
  UNSAFE_componentWillMount = () => {};

  showStartDate = () => {
    this.setState({dateStartVisible: true});
  };

  hideStartDate = () => {
    this.setState({dateStartVisible: false});
  };

  handleStartDate = (date) => {
    this.setState({
      dateStartVisible: false,
      dateStartValue: moment(date),
      dateStartTextValue: moment(date).format('DD MMMM YYYY'),
    });
  };

  showEndDate = () => {
    this.setState({dateEndVisible: true});
  };

  hideEndDate = () => {
    this.setState({dateEndVisible: false});
  };

  handleEndDate = (date) => {
    this.setState({
      dateEndVisible: false,
      dateEndValue: moment(date),
      dateEndTextValue: moment(date).format('DD MMMM YYYY'),
    });
  };
  render() {
    return (
      <>
        {this.state.addNewDestinationPopUp ? (
          <ScrollView>
            {/*Jika ADA pop up untuk membuat destinasi tujuan baru */}
            <View style={[gs.mainContainer, {justifyContent: 'flex-start'}]}>
              {/*Tombol Buat Tujuan Destinasi */}
              <TouchableOpacity
                style={mts.buttonAddDestination}
                onPress={() => this.setState({addNewDestinationPopUp: true})}>
                <Text style={mts.buttonAddDestinationText}>
                  Buat Tujuan Destinasi
                </Text>
                <Icon
                  style={{marginLeft: 5}}
                  name={'plus-circle'}
                  size={16}
                  color={Color.white}
                />
              </TouchableOpacity>

              {/* Pop up form untuk membuat tujuan destinasi baru */}
              <View style={gs.cardSection}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  {/* Text input Tujuan Destinasi */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: Dimensions.get('window').width - 120,
                    }}>
                    <Icon name={'map-marker'} size={25} color={Color.color5} />
                    <TextInput
                      style={[mts.textInput, {width: '85%', marginLeft: 10}]}
                      placeholder={'Tujuan destinasi'}
                      onChangeText={(value) =>
                        this.setState({destinationValue: value})
                      }
                    />
                  </View>

                  {/* Text input tanggal mulai */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: Dimensions.get('window').width - 117,
                    }}>
                    <Icon name={'calendar'} size={19} color={Color.color5} />
                    <TouchableOpacity
                      style={[mts.textInput, {width: '85%', marginLeft: 10}]}
                      onPress={() => this.showStartDate()}>
                      {this.state.dateStartTextValue === 'Tanggal mulai' ? (
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'grey',
                            width: 125,
                          }}>
                          {this.state.dateStartTextValue}
                        </Text>
                      ) : (
                        <Text
                          style={{fontSize: 15, color: 'black', width: 125}}>
                          {this.state.dateStartTextValue}
                        </Text>
                      )}
                      <DateTimePicker
                        isVisible={this.state.dateStartVisible}
                        onCancel={this.hideStartDate}
                        onConfirm={this.handleStartDate}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Text input tanggal selesai */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: Dimensions.get('window').width - 117,
                    }}>
                    <Icon name={'calendar'} size={19} color={Color.color5} />
                    <TouchableOpacity
                      style={[mts.textInput, {width: '85%', marginLeft: 10}]}
                      onPress={() => this.showEndDate()}>
                      {this.state.dateEndTextValue === 'Tanggal selesai' ? (
                        <Text style={{fontSize: 15, color: 'grey', width: 125}}>
                          {this.state.dateEndTextValue}
                        </Text>
                      ) : (
                        <Text
                          style={{fontSize: 15, color: 'black', width: 125}}>
                          {this.state.dateEndTextValue}
                        </Text>
                      )}
                      <DateTimePicker
                        isVisible={this.state.dateEndVisible}
                        onCancel={this.hideEndDate}
                        onConfirm={this.handleEndDate}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Button simpan */}
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      width: '100%',
                      height: 50,
                    }}>
                    <TouchableOpacity
                      style={mts.buttonSimpan}
                      onPress={() =>
                        this.setState({addNewDestinationPopUp: false})
                      }>
                      <Text style={mts.buttonDetailText}>Simpan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Daftar Tujuan Destinasi Card */}
              <View style={[gs.cardSection, {marginTop: 20}]}>
                <Text style={[gs.cardTitle]}>Daftar Tujuan Destinasi</Text>
                <TouchableOpacity
                  style={mts.destinationBubble}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Detail Tujuan Destinasi',
                      this.state.destinationName1,
                    )
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {this.state.destinationName1}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 4}}>
                        <Icon
                          style={{marginRight: 5}}
                          name={'calendar'}
                          size={16}
                        />
                        <Text>Sen, 3 Agustus - Min, 9 Agustus</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '35%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={mts.buttonDetail}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Detail Tujuan Destinasi',
                            this.state.destinationName1,
                          )
                        }>
                        <Text style={mts.buttonDetailText}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={mts.destinationBubble}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Detail Tujuan Destinasi',
                      this.state.destinationName2,
                    )
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {this.state.destinationName2}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 4}}>
                        <Icon
                          style={{marginRight: 5}}
                          name={'calendar'}
                          size={16}
                        />
                        <Text>Sen, 3 Agustus - Min, 9 Agustus</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '35%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={mts.buttonDetail}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Detail Tujuan Destinasi',
                            this.state.destinationName2,
                          )
                        }>
                        <Text style={mts.buttonDetailText}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Rekomendasi Destinasi Card */}
              <View style={[gs.cardSection, {marginTop: 20}]}>
                <Text style={gs.cardTitle}>
                  Rekomendasi Destinasi untuk kamu
                </Text>
                <View>
<<<<<<< HEAD
                  <Text>Karena kamu melihat Jakarta</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                  </View>

                  <Text>Karena kamu melihat Yogyakarta</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                  </View>
=======
                  <TouchableOpacity onPress={() => {this.props.navigation.navigate(
                    "Rekomendasi Destinasi", "Jakarta"
                  )}} style={mts.recommendationCard} >
                    <Text>Karena kamu melihat Jakarta</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    "Rekomendasi Destinasi", "Yogyakarta"
                  )} style={mts.recommendationCard}>
                    <Text>Karena kamu melihat Yogyakarta</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                    </View>
                  </TouchableOpacity>
>>>>>>> db8bf8513192fed8dc2a8656d63eb223c536f658
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            {/*Jika TIDAK ADA pop up untuk membuat destinasi tujuan baru */}
            <View style={[gs.mainContainer, {justifyContent: 'flex-start'}]}>
              {/*Tombol Buat Tujuan Destinasi */}
              <TouchableOpacity
                style={mts.buttonAddDestination}
                onPress={() => this.setState({addNewDestinationPopUp: true})}>
                <Text style={mts.buttonAddDestinationText}>
                  Buat Tujuan Destinasi
                </Text>
                <Icon
                  style={{marginLeft: 5}}
                  name={'plus-circle'}
                  size={16}
                  color={Color.white}
                />
              </TouchableOpacity>

              {/* Daftar Tujuan Destinasi Card */}
              <View style={[gs.cardSection, {marginTop: 20}]}>
                <Text style={[gs.cardTitle]}>Daftar Tujuan Destinasi</Text>
                <TouchableOpacity
                  style={mts.destinationBubble}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Detail Tujuan Destinasi',
                      this.state.destinationName1,
                    )
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {this.state.destinationName1}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 4}}>
                        <Icon
                          style={{marginRight: 5}}
                          name={'calendar'}
                          size={16}
                        />
                        <Text>Sen, 3 Agustus - Min, 9 Agustus</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '35%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={mts.buttonDetail}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Detail Tujuan Destinasi',
                            this.state.destinationName1,
                          )
                        }>
                        <Text style={mts.buttonDetailText}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={mts.destinationBubble}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Detail Tujuan Destinasi',
                      this.state.destinationName2,
                    )
                  }>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {this.state.destinationName2}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 4}}>
                        <Icon
                          style={{marginRight: 5}}
                          name={'calendar'}
                          size={16}
                        />
                        <Text>Sen, 3 Agustus - Min, 9 Agustus</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '35%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={mts.buttonDetail}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Detail Tujuan Destinasi',
                            this.state.destinationName2,
                          )
                        }>
                        <Text style={mts.buttonDetailText}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Rekomendasi Destinasi Card */}
              <View style={[gs.cardSection, {marginTop: 20}]}>
                <Text style={gs.cardTitle}>
                  Rekomendasi Destinasi untuk kamu
                </Text>
                <View>
<<<<<<< HEAD
                  <Text>Karena kamu melihat Jakarta</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                  </View>

                  <Text>Karena kamu melihat Yogyakarta</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                    <Image
                      source={{
                        uri:
                          'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                      }}
                      style={mts.recommendationImage}
                    />
                  </View>
=======
                  <TouchableOpacity onPress={() => {this.props.navigation.navigate(
                    "Rekomendasi Destinasi", "Jakarta"
                  )}} style={mts.recommendationCard} >
                    <Text>Karena kamu melihat Jakarta</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    "Rekomendasi Destinasi", "Yogyakarta"
                  )} style={mts.recommendationCard}>
                    <Text>Karena kamu melihat Yogyakarta</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                      <Image
                        source={{
                          uri:
                            'https://www.globalgovernmentforum.com/wp-content/uploads/2019/09/Jakarta_Rizky-Maharani_Wikimedia-Commons.jpg',
                        }}
                        style={mts.recommendationImage}
                      />
                    </View>
                  </TouchableOpacity>
>>>>>>> db8bf8513192fed8dc2a8656d63eb223c536f658
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </>
    );
  }
}

import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

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

//data
import recommendationTrip from '../../data-dummy/myTrip-data/recommendationTrip.json';
import myTrips from '../../data-dummy/data.json';

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
      newDestionationAdded: false,
      dateStartVisible: false,
      dateEndVisible: false,
      destinationName1: 'Jakarta',
      destinationName2: 'Bali',
      recommendationData : recommendationTrip.data,
      myTripsData: myTrips.trips
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
      dateStartTextValue: moment(date).format('DD MMMM'),
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
      dateEndTextValue: moment(date).format('DD MMMM'),
    });
  };
  render() {
    const daftarTrip = this.state.myTripsData.map((item)=>{
      return(
        <TouchableOpacity
                  style={mts.destinationBubble}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Detail Trip', {
                        destinationName: item.destinationName,
                        startDate: item.dateFrom,
                        endDate: item.dateTo
                      }
                    )
                  }>
                  <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{
                        fontSize: RFPercentage(2.0),
                        fontWeight: 'bold'}}>
                        {item.destinationName}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: hp(0.8)}}>
                        <Icon
                          style={{marginRight: hp(1)}}
                          name={'calendar'}
                          size={hp(3)}
                        />
                        <Text style={{
                          fontSize: RFPercentage(1.6)
                        }}>{item.dateFrom} - {item.dateTo}</Text>
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
                            'Detail Trip', {
                              destinationName: item.destinationName,
                              startDate: item.dateFrom,
                              endDate: item.dateTo
                            }
                          )
                        }>
                        <Text style={mts.buttonDetailText}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
      )
    });
    const recommendationDestination = this.state.recommendationData.map((item) => {
      return(
        <View>
                  <View style={mts.recommendationCard}>
                    <Text style={{
                      fontSize: RFPercentage(1.6)
                    }}>Karena kamu melihat {item.destinationName}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: hp(1),
                        marginBottom: hp(1),
                      }}>
                      <TouchableOpacity
                        onPress={() => {this.props.navigation.navigate(
                        "Rekomendasi Destinasi", item.relatedDestinations[0].destinationName
                        )}}>
                        
                        <Image
                        source={{
                        uri: item.relatedDestinations[0].image
                        }}
                        style={mts.recommendationImage}
                        />
                        <View style={mts.blackOverlayHome}>
                        </View>
                        <View style={mts.fontContainerHome}>
                        <Text style={mts.fontOnBlackOverlay}>{item.relatedDestinations[0].destinationName}</Text>
                        </View>
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                          onPress={() => {this.props.navigation.navigate(
                          "Rekomendasi Destinasi", item.relatedDestinations[1].destinationName
                          )}}>
                          
                          <Image
                          source={{
                          uri: item.relatedDestinations[1].image
                          }}
                          style={mts.recommendationImage}
                          />
                          <View style={mts.blackOverlayHome}>
                          </View>
                          <View style={mts.fontContainerHome}>
                          <Text style={mts.fontOnBlackOverlay}>{item.relatedDestinations[1].destinationName}</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {this.props.navigation.navigate(
                          "Rekomendasi Destinasi", item.relatedDestinations[2].destinationName
                          )}}>
                          
                          <Image
                          source={{
                          uri: item.relatedDestinations[2].image
                          }}
                          style={mts.recommendationImage}
                          />
                          <View style={mts.blackOverlayHome}>
                          </View>
                          <View style={mts.fontContainerHome}>
                          <Text style={mts.fontOnBlackOverlay}>{item.relatedDestinations[2].destinationName}</Text>
                          </View>
                        </TouchableOpacity>
                          
                      
                      
                      
                    </View>
                  </View>
                </View>
      )
    });
    return (
      <>
        {this.state.addNewDestinationPopUp ? (
          <ScrollView>
            {/*Jika ADA pop up untuk membuat destinasi tujuan baru */}
            <>
            {this.state.newDestionationAdded ? (
              <View style={[gs.mainContainer, {justifyContent: 'flex-start'}]}>
              {/*Tombol Buat Tujuan Destinasi */}
              <TouchableOpacity
                style={mts.buttonAddDestination}
                onPress={() => this.setState({addNewDestinationPopUp: true})}>
                <Text style={mts.buttonAddDestinationText}>
                  Buat Trip
                </Text>
                <Icon
                  style={{marginLeft: hp(1)}}
                  name={'plus-circle'}
                  size={hp(2.3)}
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
                    <Icon name={'map-marker'} size={hp(2.7)} color={Color.color5} />
                    <TextInput
                      style={[mts.textInput, {width: '85%', marginLeft: hp(1.5)}]}
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
                    <Icon name={'calendar'} size={hp(2.5)} color={Color.color5} />
                    <TouchableOpacity
                      style={[mts.textInput, {width: '85%', marginLeft: hp(1.5)}]}
                      onPress={() => this.showStartDate()}>
                      {this.state.dateStartTextValue === 'Tanggal mulai' ? (
                        <Text
                          style={{
                            fontSize: RFPercentage(2.3),
                            color: 'grey',
                            width: wp(50),
                          }}>
                          {this.state.dateStartTextValue}
                        </Text>
                      ) : (
                        <Text
                          style={{fontSize: RFPercentage(2.3), color: 'black', width: wp(50)}}>
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
                    <Icon name={'calendar'} size={hp(2.5)} color={Color.color5} />
                    <TouchableOpacity
                      style={[mts.textInput, {width: '85%', marginLeft: hp(1.5)}]}
                      onPress={() => this.showEndDate()}>
                      {this.state.dateEndTextValue === 'Tanggal selesai' ? (
                        <Text style={{fontSize: RFPercentage(2.2), color: 'grey', width: wp(50)}}>
                          {this.state.dateEndTextValue}
                        </Text>
                      ) : (
                        <Text
                          style={{fontSize: RFPercentage(2.2), color: 'black', width: wp(50)}}>
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
                      height: hp(4),
                    }}>
                    <TouchableOpacity
                      style={mts.buttonSimpan}
                      onPress={() =>
                        this.setState({
                          addNewDestinationPopUp: false,
                          newDestionationAdded: true
                        })
                      }>
                      <Text style={mts.buttonDetailText}>Simpan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Daftar Trip Card */}
              <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
                <Text style={[gs.cardTitle]}>Daftar Trip</Text>
                {daftarTrip}
                <TouchableOpacity
                  style={mts.destinationBubble}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Detail Trip', {
                        destinationName: this.state.destinationValue,
                        startDate: this.state.dateStartTextValue,
                        endDate: this.state.dateEndTextValue
                      }
                    )
                  }>
                  <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: RFPercentage(2.2), fontWeight: 'bold'}}>
                        {this.state.destinationValue}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: hp(0.8)}}>
                        <Icon
                          style={{marginRight: hp(1)}}
                          name={'calendar'}
                          size={hp(2.3)}
                        />
                        <Text>{this.state.dateStartTextValue} - {this.state.dateEndTextValue}</Text>
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
                            'Detail Trip', {
                              destinationName: this.state.destinationValue,
                              startDate: this.state.dateStartTextValue,
                              endDate: this.state.dateEndTextValue
                            }
                          )
                        }>
                        <Text style={mts.buttonDetailText}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Rekomendasi Destinasi Card */}
              <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
                <Text style={gs.cardTitle}>
                  Rekomendasi Destinasi untuk kamu
                </Text>
                {recommendationDestination}
              </View>
            </View>
            ) : (
              <View style={[gs.mainContainer, {justifyContent: 'flex-start'}]}>
              {/*Tombol Buat Tujuan Destinasi */}
              <TouchableOpacity
                style={mts.buttonAddDestination}
                onPress={() => this.setState({addNewDestinationPopUp: true})}>
                <Text style={mts.buttonAddDestinationText}>
                  Buat Trip
                </Text>
                <Icon
                  style={{marginLeft: hp(1)}}
                  name={'plus-circle'}
                  size={hp(2.3)}
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
                    <Icon name={'map-marker'} size={hp(2.7)} color={Color.color5} />
                    <TextInput
                      style={[mts.textInput, {width: '85%', marginLeft: hp(1.5)}]}
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
                    <Icon name={'calendar'} size={hp(2.5)} color={Color.color5} />
                    <TouchableOpacity
                      style={[mts.textInput, {width: '85%', marginLeft: hp(1.5)}]}
                      onPress={() => this.showStartDate()}>
                      {this.state.dateStartTextValue === 'Tanggal mulai' ? (
                        <Text
                          style={{
                            fontSize: RFPercentage(2.3),
                            color: 'grey',
                            width: wp(50),
                          }}>
                          {this.state.dateStartTextValue}
                        </Text>
                      ) : (
                        <Text
                          style={{fontSize: RFPercentage(2.3), color: 'black', width: wp(50)}}>
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
                    <Icon name={'calendar'} size={hp(2.5)} color={Color.color5} />
                    <TouchableOpacity
                      style={[mts.textInput, {width: '85%', marginLeft: hp(1.5)}]}
                      onPress={() => this.showEndDate()}>
                      {this.state.dateEndTextValue === 'Tanggal selesai' ? (
                        <Text style={{fontSize: RFPercentage(2.3), color: 'grey', width: wp(50)}}>
                          {this.state.dateEndTextValue}
                        </Text>
                      ) : (
                        <Text
                          style={{fontSize: RFPercentage(2.3), color: 'black', width: wp(50)}}>
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
                      height: hp(4),
                    }}>
                    <TouchableOpacity
                      style={mts.buttonSimpan}
                      onPress={() =>
                        this.setState({
                          addNewDestinationPopUp: false,
                          newDestionationAdded: true
                        })
                      }>
                      <Text style={mts.buttonDetailText}>Simpan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Daftar Trip Card */}
              <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
                <Text style={[gs.cardTitle]}>Daftar Trip</Text>
                {daftarTrip}
              </View>

              {/* Rekomendasi Destinasi Card */}
              <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
                <Text style={gs.cardTitle}>
                  Rekomendasi Destinasi untuk kamu
                </Text>
                {recommendationDestination}
              </View>
            </View>
            )}
            
            </>
          </ScrollView>
        ) : (
          <ScrollView>
            {/*Jika TIDAK ADA pop up untuk membuat destinasi tujuan baru */}
            <>
            {this.state.newDestionationAdded ? (
              <View style={[gs.mainContainer, {justifyContent: 'flex-start'}]}>
              {/*Tombol Buat Tujuan Destinasi */}
              <TouchableOpacity
                style={mts.buttonAddDestination}
                onPress={() => this.setState({addNewDestinationPopUp: true})}>
                <Text style={mts.buttonAddDestinationText}>
                  Buat Trip
                </Text>
                <Icon
                  style={{marginLeft: hp(1)}}
                  name={'plus-circle'}
                  size={hp(2.3)}
                  color={Color.white}
                />
              </TouchableOpacity>

              {/* Daftar Trip Card */}
              <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
                <Text style={[gs.cardTitle]}>Daftar Trip</Text>
                {daftarTrip}
                <TouchableOpacity
                  style={mts.destinationBubble}
                  onPress={() =>
                    this.props.navigation.navigate(
                      'Detail Trip', {
                        destinationName: this.state.destinationValue,
                        startDate: this.state.dateStartTextValue,
                        endDate: this.state.dateEndTextValue
                      }
                    )
                  }>
                  <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={{fontSize: RFPercentage(2.2), fontWeight: 'bold'}}>
                        {this.state.destinationValue}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: hp(0.8)}}>
                        <Icon
                          style={{marginRight: hp(1)}}
                          name={'calendar'}
                          size={hp(2.3)}
                        />
                        <Text>{this.state.dateStartTextValue} - {this.state.dateEndTextValue}</Text>
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
                            'Detail Trip', {
                              destinationName: this.state.destinationValue,
                              startDate: this.state.dateStartTextValue,
                              endDate: this.state.dateEndTextValue
                            }
                          )
                        }>
                        <Text style={mts.buttonDetailText}>Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Rekomendasi Destinasi Card */}
              <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
                <Text style={gs.cardTitle}>
                  Rekomendasi Destinasi untuk kamu
                </Text>
                {recommendationDestination}
              </View>
            </View>
            ) : (
              <View style={[gs.mainContainer, {justifyContent: 'flex-start'}]}>
              {/*Tombol Buat Tujuan Destinasi */}
              <TouchableOpacity
                style={mts.buttonAddDestination}
                onPress={() => this.setState({addNewDestinationPopUp: true})}>
                <Text style={mts.buttonAddDestinationText}>
                  Buat Trip
                </Text>
                <Icon
                  style={{marginLeft: hp(1)}}
                  name={'plus-circle'}
                  size={hp(2.3)}
                  color={Color.white}
                />
              </TouchableOpacity>

              {/* Daftar Trip Card */}
              <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
                <Text style={[gs.cardTitle]}>Daftar Trip</Text>
                {daftarTrip}
              </View>

              {/* Rekomendasi Destinasi Card */}
              <View style={[gs.cardSection, {marginTop: hp(2.5)}]}>
                <Text style={gs.cardTitle}>
                  Rekomendasi Destinasi untuk kamu
                </Text>
                {recommendationDestination}
              </View>
            </View>
            )}
            </>
          </ScrollView>
        )}
      </>
    );
  }
}

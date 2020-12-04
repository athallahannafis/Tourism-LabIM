import React, {Component} from 'react';
import {View, Modal, Alert, Text, Image, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../style/color.json';

// data
import Attraction from '../../data-dummy/attraction-data/attraction.json';

export default class AttractionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToItineraryPopUp: false,
      successPopUp: false,
      contactInfoPopUp: false,
      attractionDataSet: {},
      attractionDestination: "",
      attractionReviews: [],
      averageRate: 0,
      temp: 0,
      status: false
    };
  }

  fetchAttractionData = (attraction) => {
    const attList = Attraction.data;
    for (let i = 0; i < attList.length; i++) {
      for (let j = 0; j < attList[i].attraction_list.length; j++) {
        if (attraction == attList[i].attraction_list[j]) {
          this.state.attractionDataSet = attList[i].attraction_list[j];
          this.state.attractionDestination = attList[i].attraction_place;
        }
      }
    }
    this.state.attractionReviews = this.state.attractionDataSet.attraction_reviews;
  };

  renderFloatingButton() {
    if (this.state.attractionDataSet.booking_available) {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(
              'Ticket Reservation',
              this.state.attractionDataSet,
            )
          }
          style={ats.floatingButton}>
          <Text style={ats.floatingButtonText}>Pesan Tiket</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={ats.floatingButton}
          onPress={() => {
            this.setState({contactInfoPopUp: true});
          }}>
          <Text style={ats.floatingButtonText}>Informasi Kontak</Text>
        </TouchableOpacity>
      );
    }
  }

  renderContactInfo() {
    if (this.state.contactInfoPopUp) {
      return (
        <View style={ats.modal3MainContainer}>
          <View style={ats.modal3SubContainer}>
            <Icon
              name={'phone'}
              size={15}
              style={{paddingRight: 5}}
              color={'white'}
            />
            <Text style={ats.textBubbleSmall}>
              {this.state.attractionDataSet.phone_number}
            </Text>
          </View>
          <View style={ats.modal3SubContainer}>
            <Icon
              name={'envelope'}
              size={12}
              style={{paddingRight: 5}}
              color={'white'}
            />
            <Text style={ats.textBubbleSmall}>
              {this.state.attractionDataSet.email}
            </Text>
          </View>
          <View style={ats.modal3SubContainer2}>
            <TouchableOpacity
              onPress={() => {
                this.setState({contactInfoPopUp: false});
              }}>
              <Text style={ats.textCloseBubbleSmall}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }

  countAverage = () => {
    let rateSum = 0,
      divisor;
    divisor = this.state.attractionReviews.length;
    for (let i = 0; i < this.state.attractionReviews.length; i++) {
      rateSum += this.state.attractionReviews[i].rate;
    }
    const result = (rateSum / divisor).toFixed(2);
    console.log(result);
    this.state.averageRate = result;
  };

  render() {
    const attraction = this.props.route.params.attraction;
    var status = this.props.route.params.fromItinerary;
    console.log(status);
    this.state.status = status;
    console.log(this.state.status);
    this.fetchAttractionData(attraction);
    this.countAverage();
    const attrFacilities = this.state.attractionDataSet.detail.facilities.map(
      (item) => {
        return (
          <View style={ats.rowInList}>
            <View style={ats.smallCircle2}></View>
            <Text style={ats.cardSmallText}>{item}</Text>
          </View>
        );
      },
    );
    
    const imageList = this.state.attractionDataSet.images_source;
    const lastAttrImage = 
    <View>
      <Image source={{uri: imageList[imageList.length-1]}} style={ats.smallImage2} />
      <View style={[ats.smallImageBlackOverlay]}>
        <View style={[ats.textOnImageContainer]}>
          <Text style={ats.textOnImage}>Lihat</Text>
          <Text style={ats.textOnImage}>Semua Foto</Text>
        </View>
      </View>
    </View>
    ;
    const attrImages = imageList.map(
      (item) => {
        if (item !== imageList[imageList.length-1]) {
          return <Image source={{uri: item}} style={ats.smallImage2} />;
        } else {
          return lastAttrImage
        }
      },
    );

    return (
      <>
      {this.state.status ? (
        <View style={[ats.container]}>
        <ScrollView>
          <View style={ats.mainContainer}>
            <View style={ats.mainImageContainer}>
              <Image
                source={{uri: this.state.attractionDataSet.image_source}}
                style={ats.mainImage}
              />
              <View style={ats.rowImageContainer}>
                {attrImages}
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={gs.cardSection}>
                <View style={ats.rowSpaceBetweenInCard}>
                  <View style={ats.columnInCard}>
                    <Text style={gs.cardTitle}>
                      {this.state.attractionDataSet.place_name}
                    </Text>
                    <Text style={ats.cardSmallText}>
                      {this.state.attractionDataSet.city_name},
                      {this.state.attractionDataSet.province}
                    </Text>
                    <View style={ats.starRatingView}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.averageRate}
                        fullStarColor={Color.color6}
                        starSize={17}
                      />
                      <Text
                        style={[
                          ats.textSmall,
                          {color: Color.color6, marginLeft: 10},
                        ]}>
                        {this.state.averageRate}
                      </Text>
                    </View>

                    <View
                      style={[
                        ats.rowContainer,
                        {
                          width: 200,
                          marginTop: 5,
                        },
                      ]}>
                      <TouchableOpacity
                        style={ats.reviewBtn}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Attraction Reviews',
                            this.state.attractionDataSet,
                          )
                        }>
                        <Text
                          style={[ats.cardMediumText, {fontWeight: 'bold'}]}>
                          ({this.state.attractionReviews.length} reviews)
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={ats.reviewBtn}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Attraction Map',
                            this.state.attractionDataSet,
                          )
                        }>
                        <Text
                          style={[ats.cardMediumText, {fontWeight: 'bold'}]}>
                          Show on map
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={ats.btnAddtoItinerary}
                    onPress={() => this.props.navigation.navigate('Buat Itinerary', {
                      destinationName: this.state.attractionDestination,
                      passAttraction: true,
                      attraction: this.state.attractionDataSet
                    })}>
                    <Text style={ats.btnAddtoItineraryText}>
                      Tambah 
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={ats.cardMediumText}>
                  {this.state.attractionDataSet.description}
                </Text>
              </View>

              <View style={{padding: 10}}></View>
              <View style={gs.cardSection}>
                <Text style={gs.cardTitle}>Detail Objek Wisata</Text>
                <View style={ats.rowFlexStart}>
                  {/*kolom kiri*/}
                  <View style={ats.columnTwo}>
                    {/*kolom kiri row 1*/}
                    <View style={ats.rowInCard}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={ats.cardSmallText}>
                          Buka {this.state.attractionDataSet.detail.open_hours}
                        </Text>
                        <Text style={ats.cardSmallText}>
                          {this.state.attractionDataSet.detail.open_days}
                        </Text>
                      </View>
                    </View>
                    {/*kolom kiri row 2*/}
                    <View style={ats.rowInCard}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column', width: '100%'}}>
                        <Text style={ats.cardSmallText}>Fasilitas</Text>
                        <View>{attrFacilities}</View>
                      </View>
                    </View>
                    {/*kolom kiri row 3*/}
                    <View style={ats.rowInList}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
                        <Text style={ats.cardSmallText}>
                          Harga tiket mulai{' '}
                          {this.state.attractionDataSet.detail.ticket_price}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/*kolom kanan*/}
                  <View style={ats.columnTwo}>
                    {/*kolom kanan row 1*/}
                    <View style={ats.rowInCard}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={ats.cardSmallText}>
                          Mampu menampung{' '}
                          {this.state.attractionDataSet.detail.visitor_capacity}{' '}
                          pengunjung setiap hari
                        </Text>
                      </View>
                    </View>
                    {/*kolom kanan row 2*/}
                    <View style={ats.rowInCard}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={ats.cardSmallText}>
                          {this.state.attractionDataSet.detail.current_status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal transparent={true} visible={this.state.addToItineraryPopUp}>
          <View style={ats.modalOverlay}>
            <View style={ats.modal1MainContainer}>
              <View
                style={{
                  paddingLeft: 15,
                }}>
                <Text style={gs.cardTitle}>Tambahkan ke Itinerary</Text>
              </View>

              <View style={ats.modal1Bubble}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={ats.textMediumBold}>Jalan-jalan Hari 1</Text>
                  <View style={ats.modal1SubBubble}>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: 5}}
                        name={'map-marker'}
                        size={16}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>4 Objek Wisata</Text>
                    </View>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: 5}}
                        name={'clock-o'}
                        size={16}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>1 Hari</Text>
                    </View>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: 5}}
                        name={'money'}
                        size={16}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>160.000</Text>
                    </View>
                  </View>
                </View>
                <View style={ats.buttonContainer}>
                  <TouchableOpacity
                    style={ats.btnAddtoItinerary2}
                    onPress={() => {
                      this.setState({successPopUp: true});
                    }}>
                    <Text style={ats.btnText}>Tambahkan</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={ats.buttonContainer}>
                <TouchableOpacity
                  style={ats.btn}
                  onPress={() => {
                    this.setState({addToItineraryPopUp: false});
                  }}>
                  <Text style={ats.btnText}> Tutup </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent={true} visible={this.state.successPopUp}>
          <View style={ats.modalOverlay}>
            <View style={ats.modal2Container}>
              <Icon name={'check-circle-o'} size={80} color={'#095185'} />
              <Text style={ats.textMediumColor4}>Berhasil menambahkan</Text>
              <Text style={ats.textMediumBoldColor4AlignCenter}>
                {this.state.attractionDataSet.place_name}
              </Text>
              <Text style={ats.textMediumColor4}>ke</Text>
              <Text style={ats.textMediumBoldColor4AlignCenter}>
                Jalan-jalan Hari 1
              </Text>
              <View style={{marginTop: 10}}>
                <TouchableOpacity style={ats.btnGotoItinerary}>
                  <Text style={ats.btnText}>Lihat Itinerary</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={ats.btn}
                onPress={() => {
                  this.setState({
                    successPopUp: false,
                    addToItineraryPopUp: false,
                  });
                }}>
                <Text style={ats.btnText}> Tutup </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={ats.floatingButtonContainer}>
          {this.renderFloatingButton()}
        </View>
        <View style={ats.modal3PlainContainer}>{this.renderContactInfo()}</View>
      </View>
      ) : (
        <View style={[ats.container]}>
        <ScrollView>
          <View style={ats.mainContainer}>
            <View style={ats.mainImageContainer}>
              <Image
                source={{uri: this.state.attractionDataSet.image_source}}
                style={ats.mainImage}
              />
              <View style={ats.rowImageContainer}>
                {attrImages}
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={gs.cardSection}>
                <View style={ats.rowSpaceBetweenInCard}>
                  <View style={ats.columnInCard}>
                    <Text style={gs.cardTitle}>
                      {this.state.attractionDataSet.place_name}
                    </Text>
                    <Text style={ats.cardSmallText}>
                      {this.state.attractionDataSet.city_name},
                      {this.state.attractionDataSet.province}
                    </Text>
                    <View style={ats.starRatingView}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={this.state.averageRate}
                        fullStarColor={Color.color6}
                        starSize={17}
                      />
                      <Text
                        style={[
                          ats.textSmall,
                          {color: Color.color6, marginLeft: 10},
                        ]}>
                        {this.state.averageRate}
                      </Text>
                    </View>

                    <View
                      style={[
                        ats.rowContainer,
                        {
                          width: 200,
                          marginTop: 5,
                        },
                      ]}>
                      <TouchableOpacity
                        style={ats.reviewBtn}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Attraction Reviews',
                            this.state.attractionDataSet,
                          )
                        }>
                        <Text
                          style={[ats.cardMediumText, {fontWeight: 'bold'}]}>
                          ({this.state.attractionReviews.length} reviews)
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={ats.reviewBtn}
                        onPress={() =>
                          this.props.navigation.navigate(
                            'Attraction Map',
                            this.state.attractionDataSet,
                          )
                        }>
                        <Text
                          style={[ats.cardMediumText, {fontWeight: 'bold'}]}>
                          Show on map
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={ats.btnAddtoItinerary}
                    onPress={() => {
                      this.setState({addToItineraryPopUp: true});
                    }}>
                    <Text style={ats.btnAddtoItineraryText}>
                      Tambah ke Itinerary
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={ats.cardMediumText}>
                  {this.state.attractionDataSet.description}
                </Text>
              </View>

              <View style={{padding: 10}}></View>
              <View style={gs.cardSection}>
                <Text style={gs.cardTitle}>Detail Objek Wisata</Text>
                <View style={ats.rowFlexStart}>
                  {/*kolom kiri*/}
                  <View style={ats.columnTwo}>
                    {/*kolom kiri row 1*/}
                    <View style={ats.rowInCard}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={ats.cardSmallText}>
                          Buka {this.state.attractionDataSet.detail.open_hours}
                        </Text>
                        <Text style={ats.cardSmallText}>
                          {this.state.attractionDataSet.detail.open_days}
                        </Text>
                      </View>
                    </View>
                    {/*kolom kiri row 2*/}
                    <View style={ats.rowInCard}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column', width: '100%'}}>
                        <Text style={ats.cardSmallText}>Fasilitas</Text>
                        <View>{attrFacilities}</View>
                      </View>
                    </View>
                    {/*kolom kiri row 3*/}
                    <View style={ats.rowInList}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
                        <Text style={ats.cardSmallText}>
                          Harga tiket mulai{' '}
                          {this.state.attractionDataSet.detail.ticket_price}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/*kolom kanan*/}
                  <View style={ats.columnTwo}>
                    {/*kolom kanan row 1*/}
                    <View style={ats.rowInCard}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={ats.cardSmallText}>
                          Mampu menampung{' '}
                          {this.state.attractionDataSet.detail.visitor_capacity}{' '}
                          pengunjung setiap hari
                        </Text>
                      </View>
                    </View>
                    {/*kolom kanan row 2*/}
                    <View style={ats.rowInCard}>
                      <View style={ats.smallCircle}></View>
                      <View style={{flexDirection: 'column'}}>
                        <Text style={ats.cardSmallText}>
                          {this.state.attractionDataSet.detail.current_status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal transparent={true} visible={this.state.addToItineraryPopUp}>
          <View style={ats.modalOverlay}>
            <View style={ats.modal1MainContainer}>
              <View
                style={{
                  paddingLeft: 15,
                }}>
                <Text style={gs.cardTitle}>Tambahkan ke Itinerary</Text>
              </View>

              <View style={ats.modal1Bubble}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={ats.textMediumBold}>Jalan-jalan Hari 1</Text>
                  <View style={ats.modal1SubBubble}>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: 5}}
                        name={'map-marker'}
                        size={16}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>4 Objek Wisata</Text>
                    </View>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: 5}}
                        name={'clock-o'}
                        size={16}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>1 Hari</Text>
                    </View>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: 5}}
                        name={'money'}
                        size={16}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>160.000</Text>
                    </View>
                  </View>
                </View>
                <View style={ats.buttonContainer}>
                  <TouchableOpacity
                    style={ats.btnAddtoItinerary2}
                    onPress={() => {
                      this.setState({successPopUp: true});
                    }}>
                    <Text style={ats.btnText}>Tambahkan</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={ats.buttonContainer}>
                <TouchableOpacity
                  style={ats.btn}
                  onPress={() => {
                    this.setState({addToItineraryPopUp: false});
                  }}>
                  <Text style={ats.btnText}> Tutup </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal transparent={true} visible={this.state.successPopUp}>
          <View style={ats.modalOverlay}>
            <View style={ats.modal2Container}>
              <Icon name={'check-circle-o'} size={80} color={'#095185'} />
              <Text style={ats.textMediumColor4}>Berhasil menambahkan</Text>
              <Text style={ats.textMediumBoldColor4AlignCenter}>
                {this.state.attractionDataSet.place_name}
              </Text>
              <Text style={ats.textMediumColor4}>ke</Text>
              <Text style={ats.textMediumBoldColor4AlignCenter}>
                Jalan-jalan Hari 1
              </Text>
              <View style={{marginTop: 10}}>
                <TouchableOpacity style={ats.btnGotoItinerary}>
                  <Text style={ats.btnText}>Lihat Itinerary</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={ats.btn}
                onPress={() => {
                  this.setState({
                    successPopUp: false,
                    addToItineraryPopUp: false,
                  });
                }}>
                <Text style={ats.btnText}> Tutup </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={ats.floatingButtonContainer}>
          {this.renderFloatingButton()}
        </View>
        <View style={ats.modal3PlainContainer}>{this.renderContactInfo()}</View>
      </View>
      )}
      </>
    );
  }
}

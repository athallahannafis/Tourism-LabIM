import React, {Component} from 'react';
import {View, Modal, Alert, Text, Image, TouchableOpacity} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

// data
import WisataPopulerData from '../../data-dummy/attraction-data/wisata-populer.json';
import AttractionInDestination from '../../data-dummy/attraction-data/attraction-in-destination.json';

export default class AttractionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToItineraryPopUp: false,
      successPopUp: false,
      contactInfoPopUp: false,
      attractionDataSet: {},
    };
  }

  fetchAttractionData = (attractionName) => {
    if (attractionName === WisataPopulerData.data.place_name) {
      /*Jika atraksi ada di dalam data wisata populer */
      this.state.attractionDataSet = WisataPopulerData.data;
    } else if (
      /*Jika atraksi merupakan popular place di data attraction in destination */
      attractionName === AttractionInDestination.popular_place.place_name
    ) {
      this.state.attractionDataSet = AttractionInDestination.popular_place;
    } else {
      /*Jika atraksi ada di dalam data attraction in destination */
      this.state.testMasuk = 'masukC';
      const attList = AttractionInDestination.tourist_attraction;
      for (let i = 0; i < attList.length; i++) {
        if (attractionName === attList[i].place_name) {
          this.state.attractionDataSet = attList[i];
        }
      }
    }
  };
  renderFloatingButton() {
    if (this.state.attractionDataSet.booking_available) {
      return (
        <TouchableOpacity style={ats.floatingButton}>
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

  render() {
    const attractionName = this.props.route.params;
    this.fetchAttractionData(attractionName);
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

    const attrImages = this.state.attractionDataSet.images_source.map(
      (item) => {
        return <Image source={{uri: item}} style={ats.smallImage2} />;
      },
    );
    return (
      <View style={[gs.mainContainer]}>
        <ScrollView>
          <View style={ats.mainImageContainer}>
            <Image
              source={{uri: this.state.attractionDataSet.image_source}}
              style={ats.mainImage}
            />
            <View style={ats.rowImageContainer}>
              {attrImages}
              <View style={ats.smallImageBlackOverlay} />
              <View style={ats.textOnImageContainer}>
                <Text style={ats.textOnImage}>Lihat</Text>
                <Text style={ats.textOnImage}>Semua Foto</Text>
              </View>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={gs.cardSection}>
              <View style={ats.rowSpaceBetweenInCard}>
                <View style={ats.columnInCard}>
                  <Text style={ats.cardTitleText}>
                    {this.state.attractionDataSet.place_name}
                  </Text>
                  <Text style={ats.cardSmallText}>
                    {this.state.attractionDataSet.city_name},
                    {this.state.attractionDataSet.province}
                  </Text>
                  <Text style={ats.cardMediumText}>(183 review)</Text>
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
              <Text style={ats.cardTitleText}>Detail Objek Wisata</Text>
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
                <Text style={ats.textMediumBoldColor4}>
                  {this.state.attractionDataSet.place_name}
                </Text>
                <Text style={ats.textMediumColor4}>ke</Text>
                <Text style={ats.textMediumBoldColor4}>Jalan-jalan Hari 1</Text>
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
        </ScrollView>
        <View style={ats.floatingButtonContainer}>
          {this.renderFloatingButton()}
        </View>
        <View style={ats.modal3PlainContainer}>{this.renderContactInfo()}</View>
      </View>
    );
  }
}

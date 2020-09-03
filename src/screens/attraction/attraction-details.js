import React, {Component} from 'react';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {profilStyling as ps} from '../../style/profil-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {
  View,
  Modal,
  Text,
  Image,
  PixelRatio,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

// data
import ExploreData from '../../data-dummy/attraction-data/explore-indonesia.json';
import WisataPopulerData from '../../data-dummy/attraction-data/wisata-populer.json';
import {profilStyling} from '../../style/profil-styling';

export default class AttractionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToItineraryPopUp: false,
      successPopUp: false,
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={[gs.mainContainer]}>
          <View style={ats.mainImageContainer}>
            <Image
              source={require('../../images/dummy-image.jpg')}
              style={ats.mainImage}
            />
            <View style={ats.rowImageContainer}>
              <Image
                source={require('../../images/dummy-image.jpg')}
                style={ats.smallImage2}
              />
              <Image
                source={require('../../images/dummy-image.jpg')}
                style={ats.smallImage2}
              />
              <Image
                source={require('../../images/dummy-image.jpg')}
                style={ats.smallImage2}
              />
              <Image
                source={require('../../images/dummy-image.jpg')}
                style={ats.smallImage2WithText}
              />
              <View style={ats.smallImageBlackOverlay} />
              <View style={ats.textOnImageContainer}>
                <Text style={ats.textOnImage}>Lihat</Text>
                <Text style={ats.textOnImage}>Semua Foto</Text>
              </View>
            </View>
          </View>

          <View style={gs.cardSection}>
            <View style={ats.rowSpaceBetweenInCard}>
              <View style={ats.columnInCard}>
                <Text style={ats.cardTitleText}>Bromo Tengger Semeru</Text>
                <Text style={ats.cardSmallText}>Malang, Jawa Timur</Text>
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
              Bromo Tengger Semeru menawarkan pemandangan gunung indah yang
              dihiasi padang savana, rasakan pengalaman tak terlupakan di Bromo
              Tengger Semeru!
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
                      Buka 10.00 AM - 04.00 PM
                    </Text>
                    <Text style={ats.cardSmallText}>Senin - Minggu</Text>
                  </View>
                </View>
                {/*kolom kiri row 2*/}
                <View style={ats.rowInCard}>
                  <View style={ats.smallCircle}></View>
                  <View style={{flexDirection: 'column', width: '100%'}}>
                    <Text style={ats.cardSmallText}>Fasilitas</Text>
                    {/*row fasilitas 1 */}
                    <View style={ats.rowInList}>
                      <View style={ats.smallCircle2}></View>
                      <Text style={ats.cardSmallText}>Area Parkir</Text>
                    </View>
                    {/*row fasilitas 2 */}
                    <View style={ats.rowInList}>
                      <View style={ats.smallCircle2}></View>
                      <Text style={ats.cardSmallText}>ATMs</Text>
                    </View>
                    {/*row fasilitas 3 */}
                    <View style={ats.rowInList}>
                      <View style={ats.smallCircle2}></View>
                      <Text style={ats.cardSmallText}>Kamar Mandi</Text>
                    </View>
                  </View>
                </View>
                {/*kolom kiri row 3*/}
                <View style={ats.rowInList}>
                  <View style={ats.smallCircle}></View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={ats.cardSmallText}>
                      Harga tiket mulai Rp.15.000,00
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
                      Mampu menampung 20.000 pengunjung setiap hari
                    </Text>
                  </View>
                </View>
                {/*kolom kanan row 2*/}
                <View style={ats.rowInCard}>
                  <View style={ats.smallCircle}></View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={ats.cardSmallText}>Sedang ramai</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={ats.mainImageContainer}>
              <Image
                source={require('../../images/dummy-image.jpg')}
                style={ats.mainImage}></Image>
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
                  <View
                    style={{
                      flexDirection: 'column',
                    }}>
                    <Text style={ats.textMediumBold}>Jalan-jalan Hari 1</Text>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                      }}>
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
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={ats.btnAddtoItinerary2}
                      onPress={() => {
                        this.setState({successPopUp: true});
                      }}>
                      <Text style={ats.btnText}>Tambahkan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
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
                  Bromo Tengger Semeru
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
        </View>
      </ScrollView>
    );
  }
}

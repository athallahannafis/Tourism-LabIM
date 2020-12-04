import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {attractionStyling as ats} from '../../style/attraction-styling';
import {myTripStyling as mts} from '../../style/my-trip-styling';

//adition
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Color from '../../style/color.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

export default class MyTripItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      newitinerary_added : false,
      destinationName: props.route.params.destinationName,
      morethanone: false
    };
  }

  UNSAFE_componentWillMount = () => {
  };

  capitalize = (str) => {
    if(str == null) {
        return str;
    }

    return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

  render() {
    const itinerary_name = this.props.route.params.nama;
    const price = this.props.route.params.price;
    const listAttractions = this.props.route.params.list_attractions;
    console.log(listAttractions);
    const list_length = listAttractions.length;
    if (list_length == 2) {
      this.state.morethanone = true;
    };
    const capitalized_itinerary_name = this.capitalize(itinerary_name);
    this.state.name = itinerary_name;
    if (this.state.name != ''){
      this.state.newitinerary_added = true;
    }

    return (
      <ScrollView>
        {this.state.newitinerary_added ? (
          <>
          {this.state.morethanone ? (
            <View style={gs.mainContainer}>
            {/*Button Buat Itinerary */}
            <TouchableOpacity
              style={mts.buttonAddItinerary}
              onPress={() => this.props.navigation.navigate('Buat Itinerary', {
                destinationName: this.state.destinationName,
                passAttraction: false,
                attraction: null
                })}>
              <Text style={mts.buttonAddItineraryText}>Buat Itinerary</Text>
              <Icon
                style={{marginLeft: hp(2.3)}}
                name={'plus-circle'}
                size={hp(1.5)}
                color={Color.white}
              />
            </TouchableOpacity>
  
            {/*Daftar Itinerary Card */}
            <View style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
              <Text  style={gs.cardTitle}>Daftar Itinerary</Text>
              <View style={ats.modal1Bubble}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={ats.textMediumBold}>{capitalized_itinerary_name}</Text>
                    <View style={ats.modal1SubBubble}>
                      <View style={ats.modal1Container2}>
                        <Icon
                          style={{marginRight: hp(1)}}
                          name={'map-marker'}
                          size={hp(1.5)}
                          color={'black'}
                        />
                        <Text style={ats.textSmall}>2 Objek Wisata</Text>
                      </View>
                      <View style={ats.modal1Container2}>
                        <Icon
                          style={{marginRight: hp(1)}}
                          name={'clock-o'}
                          size={hp(1.5)}
                          color={'black'}
                        />
                        <Text style={ats.textSmall}>1 Hari</Text>
                      </View>
                      <View style={ats.modal1Container2}>
                        <Icon
                          style={{marginRight: hp(1)}}
                          name={'money'}
                          size={hp(1.5)}
                          color={'black'}
                        />
                        <Text style={ats.textSmall}>{price}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={ats.buttonContainer}>
                    <TouchableOpacity
                      style={[ats.btnAddtoItinerary2, {width: '100%', padding:1, borderRadius:hp(1.7)}]}
                      onPress={() => {
                        this.props.navigation.navigate(
                          "Detail Itinerary",
                          {
                            list_name: listAttractions[0].place_name + ", " + listAttractions[1].place_name,
                            price: price,
                            duration: "1 Hari",
                          }
                        );
                      }}>
                      <Text style={ats.btnText}>Detail</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
  
            {/*Rekomendasi Itinerary Card */}
            <View style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
              {/* Judul */}
              <Text style={gs.cardTitle}>Rekomendasi Itinerary</Text>
              {/* Layout isi */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width - 250
                  }}
                >
                  {/*Image Container */}
                  <View>
                    <Image
                      source={{
                        uri:
                          'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                      }}
                      style={mts.imageInCard}
                    />
                    <View style={mts.threeImagesContainer}>
                      <Image
                        source={{
                          uri:
                            'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                        }}
                        style={mts.smallImageInCard}
                      />
                      <Image
                        source={{
                          uri:
                            'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                        }}
                        style={mts.smallImageInCard}
                      />
                    </View>
                  </View>
                  <Text style={{fontWeight: 'bold',
                  fontSize: RFPercentage(1.6)
                }}>
                    Objek A, Objek B, Objek C, Objek D
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'clock-o'}
                      size={hp(1.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.6)}}>4-6 Hari</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'money'}
                      size={hp(1.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.5)}}>600.000 - 800.000</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width - 250
                  }}>
                  {/*Image Container */}
                  <View>
                    <Image
                      source={{
                        uri:
                          'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                      }}
                      style={mts.imageInCard}
                    />
                    <View style={mts.threeImagesContainer}>
                      <Image
                        source={{
                          uri:
                            'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                        }}
                        style={mts.smallImageInCard}
                      />
                      <Image
                        source={{
                          uri:
                            'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                        }}
                        style={mts.smallImageInCard}
                      />
                    </View>
                  </View>
                  <Text style={{fontWeight: 'bold',
                  fontSize: RFPercentage(1.6)}}>
                    Objek A, Objek B, Objek C, Objek D
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'clock-o'}
                      size={hp(1.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.5)}}>2-4 Hari</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'money'}
                      size={hp(1.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.5)}}>200.000-500.000</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
  
            {/*Rekomendasi Restoran Card */}
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Rekomendasi Restoran")}
            style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
              {/* Judul */}
              <Text style={gs.cardTitle}>Rekomendasi Restoran di sekitarmu</Text>
              {/* Layout isi */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                {/*Restoran pertama */}
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width - 270
                  }}>
                  <Image
                    source={{
                      uri:
                        'https://s2.bukalapak.com/uploads/content_attachment/cfa0e31e40e8d76253c166c5/w-744/15101632_216930802080286_4038305728337805312_n-2.jpg',
                    }}
                    style={mts.squareImage}
                  />
                  <Text style={{fontWeight: 'bold',
                  fontSize: RFPercentage(1.6)
                    }}>Bali Asli</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={5}
                      fullStarColor={'grey'}
                      starSize={hp(1.5)}
                    />
                    <Text
                      style={{fontSize: RFPercentage(1.5),
                      fontWeight: 'bold', marginLeft: hp(1)}}>
                      (173 Reviews)
                    </Text>
                  </View>
                  <Text style={{fontSize: RFPercentage(1.5)}}>
                    Sajian makanan cita rasa tradisional Bali dipadu dgn
                    pemandangan Gunung Agung. Tersedia kelas memasak.
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'money'}
                      size={hp(1.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                  </View>
                </TouchableOpacity>
  
                {/*Restoran kedua */}
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width - 270,
                  }}>
                  <Image
                    source={{
                      uri:
                        'https://s2.bukalapak.com/uploads/content_attachment/cfa0e31e40e8d76253c166c5/w-744/15101632_216930802080286_4038305728337805312_n-2.jpg',
                    }}
                    style={mts.squareImage}
                  />
                  <Text style={{fontWeight: 'bold'}}>Bali Asli</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={5}
                      fullStarColor={'grey'}
                      starSize={hp(1.5)}
                    />
                    <Text
                      style={{fontSize: RFPercentage(1.5),
                      fontWeight: 'bold', marginLeft: hp(1)}}>
                      (173 Reviews)
                    </Text>
                  </View>
                  <Text style={{fontSize: RFPercentage(1.5)}}>
                    Sajian makanan cita rasa tradisional Bali dipadu dgn
                    pemandangan Gunung Agung. Tersedia kelas memasak.
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'money'}
                      size={hp(1.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
  
            {/*Rekomendasi Cenderamata Card */}
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Rekomendasi Cendera Mata")}
            style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
              {/* Judul */}
              <Text style={gs.cardTitle}>Toko Cendera mata untuk kamu</Text>
              {/* Layout isi */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                {/* Toko pertama */}
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width - 270,
                  }}>
                  <Image
                    source={{
                      uri:
                        'https://cdn.idntimes.com/content-images/community/2018/10/bali2017-8529-3d6f17a47f5295cb05dba70ad6e158ab.jpg',
                    }}
                    style={mts.squareImage}
                  />
                  <Text style={{fontWeight: 'bold',
                  fontSize: RFPercentage(1.8)
                  }}>Souvenir Bali</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={5}
                      fullStarColor={'grey'}
                      starSize={hp(1.5)}
                    />
                    <Text
                      style={{fontSize: RFPercentage(1.5),
                      fontWeight: 'bold', marginLeft: hp(1)}}>
                      (173 Reviews)
                    </Text>
                  </View>
                  <Text style={{fontSize: RFPercentage(1.5)}}>
                    Sajian makanan cita rasa tradisional Bali dipadu dgn
                    pemandangan Gunung Agung. Tersedia kelas memasak.
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'money'}
                      size={hp(1.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                  </View>
                </TouchableOpacity>
  
                {/*Restoran kedua */}
                <TouchableOpacity
                  style={{
                    width: Dimensions.get('window').width - 270,
                  }}>
                  <Image
                    source={{
                      uri:
                        'https://cdn.idntimes.com/content-images/community/2018/10/bali2017-8529-3d6f17a47f5295cb05dba70ad6e158ab.jpg',
                    }}
                    style={mts.squareImage}
                  />
                  <Text style={{fontWeight: 'bold',
                  fontSize: RFPercentage(1.8)
                  }}>Krisna Oleh-oleh</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={5}
                      fullStarColor={'grey'}
                      starSize={hp(1.5)}
                    />
                    <Text
                      style={{fontSize: RFPercentage(1.5),
                      fontWeight: 'bold', marginLeft: hp(1)}}>
                      (173 Reviews)
                    </Text>
                  </View>
                  <Text style={{fontSize: RFPercentage(1.5)}}>
                    Sajian makanan cita rasa tradisional Bali dipadu dgn
                    pemandangan Gunung Agung. Tersedia kelas memasak.
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      style={{marginRight: hp(1)}}
                      name={'money'}
                      size={hp(1.5)}
                      color={'black'}
                    />
                    <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          ) : (
            <View style={gs.mainContainer}>
          {/*Button Buat Itinerary */}
          <TouchableOpacity
            style={mts.buttonAddItinerary}
            onPress={() => this.props.navigation.navigate('Buat Itinerary', {
              destinationName: this.state.destinationName,
              passAttraction: false,
              attraction: null
              })}>
            <Text style={mts.buttonAddItineraryText}>Buat Itinerary</Text>
            <Icon
              style={{marginLeft: hp(2.3)}}
              name={'plus-circle'}
              size={hp(1.5)}
              color={Color.white}
            />
          </TouchableOpacity>

          {/*Daftar Itinerary Card */}
          <View style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
            <Text  style={gs.cardTitle}>Daftar Itinerary</Text>
            <View style={ats.modal1Bubble}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={ats.textMediumBold}>{capitalized_itinerary_name}</Text>
                  <View style={ats.modal1SubBubble}>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: hp(1)}}
                        name={'map-marker'}
                        size={hp(1.5)}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>2 Objek Wisata</Text>
                    </View>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: hp(1)}}
                        name={'clock-o'}
                        size={hp(1.5)}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>1 Hari</Text>
                    </View>
                    <View style={ats.modal1Container2}>
                      <Icon
                        style={{marginRight: hp(1)}}
                        name={'money'}
                        size={hp(1.5)}
                        color={'black'}
                      />
                      <Text style={ats.textSmall}>{price}</Text>
                    </View>
                  </View>
                </View>
                <View style={ats.buttonContainer}>
                  <TouchableOpacity
                    style={[ats.btnAddtoItinerary2, {width: '100%', padding:1, borderRadius:hp(1.7)}]}
                    onPress={() => {
                      this.props.navigation.navigate(
                        "Detail Itinerary",
                        {
                          list_name: listAttractions[0].place_name,
                          price: price,
                          duration: "1 Hari",
                        }
                      );
                    }}>
                    <Text style={ats.btnText}>Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </View>

          {/*Rekomendasi Itinerary Card */}
          <View style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
            {/* Judul */}
            <Text style={gs.cardTitle}>Rekomendasi Itinerary</Text>
            {/* Layout isi */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width - 250
                }}
              >
                {/*Image Container */}
                <View>
                  <Image
                    source={{
                      uri:
                        'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                    }}
                    style={mts.imageInCard}
                  />
                  <View style={mts.threeImagesContainer}>
                    <Image
                      source={{
                        uri:
                          'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                      }}
                      style={mts.smallImageInCard}
                    />
                    <Image
                      source={{
                        uri:
                          'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                      }}
                      style={mts.smallImageInCard}
                    />
                  </View>
                </View>
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.6)
              }}>
                  Objek A, Objek B, Objek C, Objek D
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'clock-o'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.6)}}>4-6 Hari</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>600.000 - 800.000</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width - 250
                }}>
                {/*Image Container */}
                <View>
                  <Image
                    source={{
                      uri:
                        'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                    }}
                    style={mts.imageInCard}
                  />
                  <View style={mts.threeImagesContainer}>
                    <Image
                      source={{
                        uri:
                          'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                      }}
                      style={mts.smallImageInCard}
                    />
                    <Image
                      source={{
                        uri:
                          'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                      }}
                      style={mts.smallImageInCard}
                    />
                  </View>
                </View>
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.6)}}>
                  Objek A, Objek B, Objek C, Objek D
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'clock-o'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>2-4 Hari</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>200.000-500.000</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/*Rekomendasi Restoran Card */}
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Rekomendasi Restoran")}
          style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
            {/* Judul */}
            <Text style={gs.cardTitle}>Rekomendasi Restoran di sekitarmu</Text>
            {/* Layout isi */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              {/*Restoran pertama */}
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width - 270
                }}>
                <Image
                  source={{
                    uri:
                      'https://s2.bukalapak.com/uploads/content_attachment/cfa0e31e40e8d76253c166c5/w-744/15101632_216930802080286_4038305728337805312_n-2.jpg',
                  }}
                  style={mts.squareImage}
                />
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.6)
                  }}>Bali Asli</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor={'grey'}
                    starSize={hp(1.5)}
                  />
                  <Text
                    style={{fontSize: RFPercentage(1.5),
                    fontWeight: 'bold', marginLeft: hp(1)}}>
                    (173 Reviews)
                  </Text>
                </View>
                <Text style={{fontSize: RFPercentage(1.5)}}>
                  Sajian makanan cita rasa tradisional Bali dipadu dgn
                  pemandangan Gunung Agung. Tersedia kelas memasak.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                </View>
              </TouchableOpacity>

              {/*Restoran kedua */}
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width - 270,
                }}>
                <Image
                  source={{
                    uri:
                      'https://s2.bukalapak.com/uploads/content_attachment/cfa0e31e40e8d76253c166c5/w-744/15101632_216930802080286_4038305728337805312_n-2.jpg',
                  }}
                  style={mts.squareImage}
                />
                <Text style={{fontWeight: 'bold'}}>Bali Asli</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor={'grey'}
                    starSize={hp(1.5)}
                  />
                  <Text
                    style={{fontSize: RFPercentage(1.5),
                    fontWeight: 'bold', marginLeft: hp(1)}}>
                    (173 Reviews)
                  </Text>
                </View>
                <Text style={{fontSize: RFPercentage(1.5)}}>
                  Sajian makanan cita rasa tradisional Bali dipadu dgn
                  pemandangan Gunung Agung. Tersedia kelas memasak.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/*Rekomendasi Cenderamata Card */}
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Rekomendasi Cendera Mata")}
          style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
            {/* Judul */}
            <Text style={gs.cardTitle}>Toko Cendera mata untuk kamu</Text>
            {/* Layout isi */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              {/* Toko pertama */}
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width - 270,
                }}>
                <Image
                  source={{
                    uri:
                      'https://cdn.idntimes.com/content-images/community/2018/10/bali2017-8529-3d6f17a47f5295cb05dba70ad6e158ab.jpg',
                  }}
                  style={mts.squareImage}
                />
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.8)
                }}>Souvenir Bali</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor={'grey'}
                    starSize={hp(1.5)}
                  />
                  <Text
                    style={{fontSize: RFPercentage(1.5),
                    fontWeight: 'bold', marginLeft: hp(1)}}>
                    (173 Reviews)
                  </Text>
                </View>
                <Text style={{fontSize: RFPercentage(1.5)}}>
                  Sajian makanan cita rasa tradisional Bali dipadu dgn
                  pemandangan Gunung Agung. Tersedia kelas memasak.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                </View>
              </TouchableOpacity>

              {/*Restoran kedua */}
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width - 270,
                }}>
                <Image
                  source={{
                    uri:
                      'https://cdn.idntimes.com/content-images/community/2018/10/bali2017-8529-3d6f17a47f5295cb05dba70ad6e158ab.jpg',
                  }}
                  style={mts.squareImage}
                />
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.8)
                }}>Krisna Oleh-oleh</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor={'grey'}
                    starSize={hp(1.5)}
                  />
                  <Text
                    style={{fontSize: RFPercentage(1.5),
                    fontWeight: 'bold', marginLeft: hp(1)}}>
                    (173 Reviews)
                  </Text>
                </View>
                <Text style={{fontSize: RFPercentage(1.5)}}>
                  Sajian makanan cita rasa tradisional Bali dipadu dgn
                  pemandangan Gunung Agung. Tersedia kelas memasak.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
          ) }
          </>
        ) : (
          <View style={gs.mainContainer}>
          {/*Button Buat Itinerary */}
          <TouchableOpacity
            style={mts.buttonAddItinerary}
            onPress={() => this.props.navigation.navigate('Buat Itinerary', {
              destinationName: this.state.destinationName,
              passAttraction: false,
              attraction: null
              })}>
            <Text style={mts.buttonAddItineraryText}>Buat Itinerary</Text>
            <Icon
              style={{marginLeft: hp(2.3)}}
              name={'plus-circle'}
              size={hp(1.5)}
              color={Color.white}
            />
          </TouchableOpacity>

          {/*Rekomendasi Itinerary Card */}
          <View style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
            {/* Judul */}
            <Text style={gs.cardTitle}>Rekomendasi Itinerary</Text>
            {/* Layout isi */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{width: "50%"}}>
                {/*Image Container */}
                <View>
                  <Image
                    source={{
                      uri:
                        'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                    }}
                    style={mts.imageInCard}
                  />
                  <View style={mts.threeImagesContainer}>
                    <Image
                      source={{
                        uri:
                          'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                      }}
                      style={mts.smallImageInCard}
                    />
                    <Image
                      source={{
                        uri:
                          'https://cdns.klimg.com/merdeka.com/i/w/news/2019/12/09/1132029/540x270/6-tempat-wisata-baru-yang-viral-di-tahun-2019.jpg',
                      }}
                      style={mts.smallImageInCard}
                    />
                  </View>
                </View>
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.6)}}>
                  Objek A, Objek B, Objek C, Objek D
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'clock-o'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.6)}}>4-6 Hari</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>600.000 - 800.000</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "50%",
                }}>
                {/*Image Container */}
                <View>
                  <Image
                    source={{
                      uri:
                        'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                    }}
                    style={mts.imageInCard}
                  />
                  <View style={mts.threeImagesContainer}>
                    <Image
                      source={{
                        uri:
                          'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                      }}
                      style={mts.smallImageInCard}
                    />
                    <Image
                      source={{
                        uri:
                          'https://cdn.water-sport-bali.com/wp-content/uploads/2020/07/20-Tempat-Wisata-Untuk-Dikunjungi-Bali.jpg',
                      }}
                      style={mts.smallImageInCard}
                    />
                  </View>
                </View>
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.6)}}>
                  Objek A, Objek B, Objek C, Objek D
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'clock-o'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>2-4 Hari</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>200.000-500.000</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/*Rekomendasi Restoran Card */}
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Rekomendasi Restoran")}
          style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
            {/* Judul */}
            <Text style={gs.cardTitle}>Rekomendasi Restoran di sekitarmu</Text>
            {/* Layout isi */}
            <View
              style={{
                flex:0,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/*Restoran pertama */}
              <TouchableOpacity
                style={{
                  width: "50%",
                }}>
                <Image
                  source={{
                    uri:
                      'https://s2.bukalapak.com/uploads/content_attachment/cfa0e31e40e8d76253c166c5/w-744/15101632_216930802080286_4038305728337805312_n-2.jpg',
                  }}
                  style={mts.squareImage}
                />
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(2)
                }}>Bali Asli</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor={'grey'}
                    starSize={hp(1.5)}
                  />
                  <Text
                    style={{fontSize: RFPercentage(1.5),
                    fontWeight: 'bold', marginLeft: hp(1)}}>
                    (173 Reviews)
                  </Text>
                </View>
                <Text style={{fontSize: RFPercentage(1.5)}}>
                  Sajian makanan cita rasa tradisional Bali dipadu dgn
                  pemandangan Gunung Agung. Tersedia kelas memasak.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                </View>
              </TouchableOpacity>

              {/*Restoran kedua */}
              <TouchableOpacity
                style={{
                  width: "50%",
                }}>
                <Image
                  source={{
                    uri:
                      'https://s2.bukalapak.com/uploads/content_attachment/cfa0e31e40e8d76253c166c5/w-744/15101632_216930802080286_4038305728337805312_n-2.jpg',
                  }}
                  style={mts.squareImage}
                />
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(2)
                }}>Bali Asli</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor={'grey'}
                    starSize={hp(1.5)}
                  />
                  <Text
                    style={{fontSize: RFPercentage(1.5),
                    fontWeight: 'bold', marginLeft: hp(1)}}>
                    (173 Reviews)
                  </Text>
                </View>
                <Text style={{fontSize: RFPercentage(1.5)}}>
                  Sajian makanan cita rasa tradisional Bali dipadu dgn
                  pemandangan Gunung Agung. Tersedia kelas memasak.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/*Rekomendasi Cenderamata Card */}
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Rekomendasi Cendera Mata")}
          style={[gs.cardSection, {marginBottom: hp(2.5)}]}>
            {/* Judul */}
            <Text style={gs.cardTitle}>Toko Cendera mata untuk kamu</Text>
            {/* Layout isi */}
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Toko pertama */}
              <TouchableOpacity
                style={{
                  width: "50%"
                }}>
                <Image
                  source={{
                    uri:
                      'https://cdn.idntimes.com/content-images/community/2018/10/bali2017-8529-3d6f17a47f5295cb05dba70ad6e158ab.jpg',
                  }}
                  style={mts.squareImage}
                />
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.8)
                }}>Souvenir Bali</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor={'grey'}
                    starSize={hp(1.5)}
                  />
                  <Text
                    style={{fontSize: RFPercentage(1.5),
                    fontWeight: 'bold', marginLeft: hp(1)}}>
                    (173 Reviews)
                  </Text>
                </View>
                <Text style={{fontSize: RFPercentage(1.5)}}>
                  Sajian makanan cita rasa tradisional Bali dipadu dgn
                  pemandangan Gunung Agung. Tersedia kelas memasak.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                </View>
              </TouchableOpacity>

              {/*Restoran kedua */}
              <TouchableOpacity
                style={{
                  width: "50%"
                }}>
                <Image
                  source={{
                    uri:
                      'https://cdn.idntimes.com/content-images/community/2018/10/bali2017-8529-3d6f17a47f5295cb05dba70ad6e158ab.jpg',
                  }}
                  style={mts.squareImage}
                />
                <Text style={{fontWeight: 'bold',
                fontSize: RFPercentage(1.8)
                }}>Krisna Oleh-oleh</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={5}
                    fullStarColor={'grey'}
                    starSize={hp(1.5)}
                  />
                  <Text
                    style={{fontSize: RFPercentage(1.5),
                    fontWeight: 'bold', marginLeft: hp(1)}}>
                    (173 Reviews)
                  </Text>
                </View>
                <Text style={{fontSize: RFPercentage(1.5)}}>
                  Sajian makanan cita rasa tradisional Bali dipadu dgn
                  pemandangan Gunung Agung. Tersedia kelas memasak.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    style={{marginRight: hp(1)}}
                    name={'money'}
                    size={hp(1.5)}
                    color={'black'}
                  />
                  <Text style={{fontSize: RFPercentage(1.5)}}>100.000-300.000</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        )}
      </ScrollView>
    );
  }
}

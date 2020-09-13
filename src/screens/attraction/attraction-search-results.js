import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

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
    };
  }

  UNSAFE_componentWillMount = () => {
    this.state.searchedPlace = this.props.route.params.toLowerCase();
    this.fetchAttraction(this.state.searchedPlace);
  };

  fetchAttraction = (searchedPlace) => {
    console.log(searchedPlace);
    console.log('--------------------------------');
    let the_data = AllAttraction.data;
    for (let i = 0; i < the_data.length; i++) {
      //kalo keyword bagian dari nama tempat/destinasi misal "Monas"
      attr_list = the_data[i].attraction_list;
      for (let l = 0; l < attr_list.length; l++) {
        if (attr_list[l].place_name.toLowerCase().includes(searchedPlace)) {
          if (!this.state.cityDestinationData.includes(the_data[i])) {
            this.state.cityDestinationData.push(the_data[i]);
          }
          if (!this.state.destinationData.includes(attr_list[l])) {
            this.state.destinationData.push(attr_list[l]);
            if (attr_list[l].isPopular === true) {
              console.log('masuk 1');
              console.log(attr_list[l].place_name);
              this.state.popularDestinationData.push(attr_list[l]);
            } else {
              console.log('tidak populer 1');
              console.log(attr_list[l].place_name);
            }
          }
        }
      }
    }
    for (let i = 0; i < the_data.length; i++) {
      //kalo keyword bagian dari nama kota misal "Jakarta" atau "Jak"
      attr_list = the_data[i].attraction_list;
      if (the_data[i].attraction_place.toLowerCase().includes(searchedPlace)) {
        if (!this.state.cityDestinationData.includes(the_data[i])) {
          this.state.cityDestinationData.push(the_data[i]);
        }
        for (let j = 0; j < attr_list.length; j++) {
          this.state.destinationData.push(attr_list[j]);
          if (attr_list[j].isPopular === true) {
            console.log('masuk 2');
            console.log(attr_list[j].place_name);
            this.state.popularDestinationData.push(attr_list[j]);
          } else {
            console.log('tidak populer 2');
            console.log(attr_list[l].place_name);
          }
        }
      }
    }
    for (let i = 0; i < the_data.length; i++) {
      //kalo keyword bagian dari nama tempat/destinasi misal "Monas"
      attr_list = the_data[i].attraction_list;
      for (let l = 0; l < attr_list.length; l++) {
        if (attr_list[l].city_name.toLowerCase().includes(searchedPlace)) {
          if (!this.state.cityDestinationData.includes(the_data[i])) {
            this.state.cityDestinationData.push(the_data[i]);
          }
          if (!this.state.destinationData.includes(attr_list[l])) {
            this.state.destinationData.push(attr_list[l]);
            if (attr_list[l].isPopular === true) {
              console.log('masuk 3');
              console.log(attr_list[l].place_name);
              this.state.popularDestinationData.push(attr_list[l]);
            } else {
              console.log('tidak populer 3');
              console.log(attr_list[l].place_name);
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
      <ScrollView>
        <View style={gs.mainContainer}>
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
    );
  }
}

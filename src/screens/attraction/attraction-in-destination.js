import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as dp} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

// style
import {globalStyling as gs} from '../../style/global-styling';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Color from '../../style/color.json';


// data
import attInDestination from '../../data-dummy/attraction-data/attraction-in-destination.json';
import AllAttraction from '../../data-dummy/attraction-data/attraction.json';

export default class AttractionInDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ATTRACTION_PLACE: '',
      destinationData: [],
      lastTouristAtt: [],
    };
  }

  UNSAFE_componentWillMount = () => {
    this.state.ATTRACTION_PLACE = this.props.route.params;
    this.fetchAttraction(this.state.ATTRACTION_PLACE);
  };

  fetchAttraction = (attractionPlace) => {
    for (let i = 0; i < AllAttraction.data.length; i++) {
      if (attractionPlace === AllAttraction.data[i].attraction_place) {
        this.state.destinationData = AllAttraction.data[i].attraction_list;
      }
    }
    console.log(this.state.destinationData.length);
  };

  render() {
    const objekWisataRender = this.state.destinationData.map((item) => {
      if (item.isPopular === false) {
        const len = this.state.destinationData.length;
        if (item === this.state.destinationData[len - 1]) {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Attraction Details', 
                  {'attraction':item, 'fromItinerary':false})
                }>
                <View style={[gs.rowContainerNoWrap, {paddingVertical: 20}]}>
                  {/* Left section */}
                  <View style={[gs.rowContainer, {width: wp(40)}]}>
                    <Image
                      source={{uri: item.image_source}}
                      style={gs.smallImage}
                    />
                  </View>
                  {/* Right section */}
                  <View style={[{width: wp(40), marginLeft: 20}]}>
                    <Text style={gs.subCardTitle}>{item.place_name}</Text>
                    <Text style={{fontSize: RFPercentage(1.4)}}>
                      {item.description}
                    </Text>
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
                  this.props.navigation.navigate('Attraction Details', 
                  {'attraction':item, 'fromItinerary':false})
                }>
                <View style={[gs.rowContainerNoWrap, {paddingVertical: 20}]}>
                  {/* Left section */}
                  <View style={[gs.rowContainer, {width: wp(40)}]}>
                    <Image
                      source={{uri: item.image_source}}
                      style={gs.smallImage}
                    />
                  </View>
                  {/* Right section */}
                  <View style={[{width: wp(40), marginLeft: 20}]}>
                    <Text style={gs.subCardTitle}>{item.place_name}</Text>
                    <Text style={{fontSize: RFPercentage(1.4)}}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{borderBottomWidth: 1, borderColor: Color.color1}}></View>
            </>
          );
        }
      }
    });

    const destList = this.state.destinationData;
    const lastItem = destList[destList.length-1];
    const lastDest = <>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate(
            'Attraction Details', {'attraction': lastItem, 'fromItinerary':false})
        }>
        <View style={[gs.rowContainerNoWrap, {paddingVertical: 20}]}>
          {/* Left section */}
          <View style={{width: wp(40)}}>
            <Text style={{fontSize: RFPercentage(1.4)}}>
              {lastItem.city_name}
            </Text>
            <Image
              source={{uri: lastItem.image_source}}
              style={gs.bigImage}
            />
          </View>
          {/* Right Section */}
          <View style={{width: wp(40)}}>
            <Text style={gs.subCardTitle}>{lastItem.place_name}</Text>
            <Text style={{fontSize: RFPercentage(1.4)}}>
              {lastItem.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  
    const wisataPopulerRender = destList.map((item) => {
      const renderItem = 
        <>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Attraction Details', {'attraction':item, 'fromItinerary':false})
            }>
            <View style={[gs.rowContainerNoWrap, {paddingVertical: 20}]}>
              {/* Left section */}
              <View style={{width: wp(40)}}>
                <Text style={{fontSize: RFPercentage(1.4)}}>
                  {item.city_name}
                </Text>
                <Image
                  source={{uri: item.image_source}}
                  style={gs.bigImage}
                />
              </View>
              {/* Right Section */}
              <View style={{width: wp(40)}}>
                <Text style={gs.subCardTitle}>{item.place_name}</Text>
                <Text style={{fontSize: RFPercentage(1.4)}}>
                  {item.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </>
      if (item.isPopular === true) {
        if (item !== this.state.destinationData[this.state.destinationData.length-1]) {
          return (
            <>
              {renderItem}
              <View style={{borderBottomWidth: 1, borderColor: Color.color1}}></View>
            </>
          )
        } else {
          return (
            <> 
            {lastDest}
            </>
          )
        }
        
      }
    });

    return (
      <ScrollView>
        <View style={gs.mainContainer}>
          <View style={gs.cardSection}>
            <Text style={gs.cardTitle}>
              Objek wisata populer di {this.state.ATTRACTION_PLACE}
            </Text>
            {wisataPopulerRender}
          </View>

          <View style={[gs.cardSection, {marginTop: 20}]}>
            <Text style={gs.cardTitle}>
              Objek Wisata di {this.state.ATTRACTION_PLACE}
            </Text>
            <View>{objekWisataRender}</View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

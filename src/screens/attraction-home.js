import React, {Component} from 'react';

// style
import {globalStyling as gs} from '../style/global-styling';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// data
import ExploreData from '../data-dummy/attraction-data/explore-indonesia.json';


export default class AttractionHome extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      city: [],
    })
  }

  // methods
  fetchCities = () => {
    const cityList = ExploreData.data.cities;
    for (let i = 0; i < cityList.length; i++) {
      this.state.city.push(cityList[i])
    }
    console.log(this.state.city);
  }

  render() {
    this.fetchCities();
    cityRender = this.state.city.map((city) => {
      console.log(city);
      return (
        <View style={gs.smallRectangularCard}>
          <Text>{city}</Text>
        </View>
      );
    });

    return (
      <ScrollView>
        <View style={[gs.mainContainer]}>

          <View style={gs.cardSection}>
              <Text>Explore Indonesia</Text>
              <View style={gs.rowContainer}>
                {cityRender}
              </View>
          </View> 

        </View>
      </ScrollView>
    )
  }
}

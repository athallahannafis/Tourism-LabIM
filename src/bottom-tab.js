import React, {Component} from 'react';
import {View, Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screen
import TestScreen from './screens/Test.js';
import ProfileHomeScreen from './screens/profile/ProfileHome.js';
import ProfileEditScreen from './screens/profile/ProfileEdit.js';
import PreferensiObjekWisataScreen from './screens/profile/PreferensiObjekWisata.js';
import PreferensiAkomodasiScreen from './screens/profile/PreferensiAkomodasi.js';
import AttractionHome from './screens/attraction/attraction-home';
import AttractionInDestination from './screens/attraction/attraction-in-destination';
import TicketReservation from './screens/ticket-reservation/reserve-ticket';
import TicketPayment from './screens/ticket-reservation/payment-ticket';
import AttractionDetails from './screens/attraction/attraction-details';
import AttractionReview from './screens/attraction/attraction-reviews';
import AttractionSearchResults from './screens/attraction/attraction-search-results';
import AttractionMap from './screens/attraction/attraction-map';
// Accomodation
import AccomodationHomeScreen from './screens/accomodation/accomodation-home';
import AccomodationDetailScreen from './screens/accomodation/accomodation-details';
import AccomodationMapScreen from './screens/accomodation/accomodation-map';
import AccomodationReviewScreen from './screens/accomodation/accomodation-reviews';

const testStack = createStackNavigator();
const bottomTab = createBottomTabNavigator();
const profileStack = createStackNavigator();
const attractionStack = createStackNavigator();
const accomodationStack = createStackNavigator();

export default class BottomTab extends Component {
  constructor(props) {
    super(props);
  }

  testScreenStack = (props) => {
    return (
      <testStack.Navigator>
        <testStack.Screen component={TestScreen} name="Test Stack" />
      </testStack.Navigator>
    );
  };

  profileScreenStack = (props) => {
    return (
      <profileStack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#2E99A3'},
          headerTintColor: 'white',
        }}>
        <profileStack.Screen
          component={ProfileHomeScreen}
          name="ProfileHome"
          options={{
            title: 'Profil Pengguna',
          }}
        />
        <profileStack.Screen
          component={ProfileEditScreen}
          name="ProfileEdit"
          options={{
            title: 'Edit Profil Pengguna',
          }}
        />
        <profileStack.Screen
          component={PreferensiObjekWisataScreen}
          name="PreferensiObjekWisata"
          options={{
            title: '',
          }}
        />
        <profileStack.Screen
          component={PreferensiAkomodasiScreen}
          name="PreferensiAkomodasi"
          options={{
            title: '',
          }}
        />
      </profileStack.Navigator>
    );
  };

  attractionStackScreen = (props) => {
    return (
      <attractionStack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#2E99A3'},
          headerTintColor: 'white',
        }}>
        <attractionStack.Screen
          component={AttractionHome}
          name="Objek Wisata dan Destinasi"
        />
        <attractionStack.Screen
          component={AttractionInDestination}
          name="Attraction in Destination"
        />
        <attractionStack.Screen
          component={AttractionDetails}
          name="Attraction Details"
        />
        <attractionStack.Screen
          component={AttractionReview}
          name="Attraction Reviews"
        />
        <attractionStack.Screen
          component={TicketReservation}
          name="Ticket Reservation"
        />
        <attractionStack.Screen
          component={TicketPayment}
          name="Ticket Payment"
        />
        <attractionStack.Screen
          component={AttractionSearchResults}
          name="Attraction Search Results"
          options={{
            title: 'Pencarian Objek Wisata dan Destinasi',
          }}
        />
        <attractionStack.Screen
          component={AttractionMap}
          name="Attraction Map"
        />
      </attractionStack.Navigator>
    );
  };

  accomodationStackScreen = (props) => {
    return (
      <accomodationStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#2E99A3'},
        headerTintColor: 'white',
      }}>
        <accomodationStack.Screen
          component={AccomodationHomeScreen}
          name="Accomodation"
        />
        <accomodationStack.Screen
          component={AccomodationDetailScreen}
          name="Accomodation Details"
        />
        <accomodationStack.Screen
          component={AccomodationMapScreen}
          name="Accomodation Map"
        />
        <accomodationStack.Screen
          component={AccomodationReviewScreen}
          name="Accomodation Review"
        />
      </accomodationStack.Navigator>
    )
  }

  render() {
    return (
      <bottomTab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          style: {
            height: '10%',
          },
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#2E99A3',
          },
          inactiveBackgroundColor: 'white',
          activeBackgroundColor: '#C1DFE1',
        }}>
        <bottomTab.Screen
          component={this.attractionStackScreen}
          options={{
            tabBarIcon: () => {
              // TODO: put image icon here
              return (
                <Image
                  style={{width: 40, height: 40}}
                  source={require('./images/bottomtab-icons/objekWisata.png')}
                />
              );
            },
          }}
          name="Objek Wisata"
        />

        <bottomTab.Screen
          component={this.accomodationStackScreen}
          options={{
            tabBarIcon: () => {
              return (
                <Image
                  style={{width: 40, height: 40}}
                  source={require('./images/bottomtab-icons/akomodasi.png')}
                />
              );
            },
          }}
          name="Akomodasi"
        />

        <bottomTab.Screen
          component={this.testScreenStack}
          options={{
            tabBarIcon: () => {
              // <Image source={require("path")}
              return (
                <Image
                  style={{width: 40, height: 40}}
                  source={require('./images/bottomtab-icons/myTrip.png')}
                />
              );
            },
          }}
          name="My Trip"
        />

        <bottomTab.Screen
          component={this.profileScreenStack}
          options={{
            tabBarIcon: () => {
              // <Image source={require("path")}
              return (
                <Image
                  style={{width: 40, height: 40}}
                  source={require('./images/bottomtab-icons/profile.png')}
                />
              );
            },
          }}
          name="Profile"
        />
      </bottomTab.Navigator>
    );
  }
}

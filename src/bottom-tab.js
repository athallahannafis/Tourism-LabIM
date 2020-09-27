import React, {Component} from 'react';
import {View, Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screen
import TestScreen from './screens/Test';
//Profile
import ProfileHome from './screens/profile/ProfileHome';
import ProfileEdit from './screens/profile/ProfileEdit';
import PreferensiObjekWisata from './screens/profile/PreferensiObjekWisata';
import PreferensiAkomodasi from './screens/profile/PreferensiAkomodasi';
//Attraction
import AttractionHome from './screens/attraction/attraction-home';
import AttractionInDestination from './screens/attraction/attraction-in-destination';
import TicketReservation from './screens/ticket-reservation/reserve-ticket';
import TicketPayment from './screens/ticket-reservation/payment-ticket';
//Attraction
import AttractionDetails from './screens/attraction/attraction-details';
import AttractionReview from './screens/attraction/attraction-reviews';
import AttractionSearchResults from './screens/attraction/attraction-search-results';
import AttractionMap from './screens/attraction/attraction-map';
// Accomodation
import AccomodationHome from './screens/accomodation/accomodation-home';
import AccomodationDetail from './screens/accomodation/accomodation-details';
import AccomodationReservation from './screens/accomodation/accomodation-reservation';
import AccomodationPayment from './screens/accomodation/accomodation-payment';
import AccomodationReview from './screens/accomodation/accomodation-reviews';

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
        <testStack.Screen component={TestScreen} name="Test" />
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
          component={ProfileHome}
          name="ProfileHome"
          options={{
            title: 'Profil Pengguna',
          }}
        />
        <profileStack.Screen
          component={ProfileEdit}
          name="ProfileEdit"
          options={{
            title: 'Edit Profil Pengguna',
          }}
        />
        <profileStack.Screen
          component={PreferensiObjekWisata}
          name="PreferensiObjekWisata"
          options={{
            title: '',
          }}
        />
        <profileStack.Screen
          component={PreferensiAkomodasi}
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
          option={{
            title: 'Seluruh Ulasan',
          }}
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
          component={AccomodationHome}
          name="Accomodation"
        />
        <accomodationStack.Screen
          component={AccomodationDetail}
          name="Accomodation Details"
        />
        <accomodationStack.Screen
          component={AccomodationReservation}
          name="Accomodation Reservation"
          options={{
            title: 'Reservasi Akomodasi',
          }}
        />
        <accomodationStack.Screen
          component={AccomodationPayment}
          name="Accomodation Payment"
          options={{
            title: 'Reservasi Akomodasi',
          }}
        />
        <accomodationStack.Screen
          component={AccomodationReview}
          name="Accomodation Review"
          options={{
            title: 'Seluruh Ulasan',
          }}
        />
      </accomodationStack.Navigator>
    );
  };

  myTripScreenStack = (props) => {
    return (
      <testStack.Navigator>
        <testStack.Screen component={TestScreen} name="My Trip" />
      </testStack.Navigator>
    );
  };

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
          component={this.myTripScreenStack}
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

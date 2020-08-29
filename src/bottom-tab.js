import React, {Component} from 'react';
import {View, Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screen
import TestScreen from './screens/Test.js';
import ProfileHomeScreen from './screens/ProfileHome.js';
import ProfileEditScreen from './screens/ProfileEdit.js';
import PreferensiObjekWisataScreen from './screens/PreferensiObjekWisata.js';
import PreferensiAkomodasiScreen from './screens/PreferensiAkomodasi.js';

const testStack = createStackNavigator();
const bottomTab = createBottomTabNavigator();
const profileStack = createStackNavigator();
import TestScreen from './screens/Test';
import AttractionHome from './screens/attraction/attraction-home';
import AttractionInDestination from './screens/attraction/attraction-in-destination';

const testStack = createStackNavigator();
const bottomTab = createBottomTabNavigator();
const attractionStack = createStackNavigator();

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
      </attractionStack.Navigator>
    );
  };

  render() {
    return (
      <bottomTab.Navigator
        tabBarOptions={{
          style: {
            height: '10%',
          },
          labelStyle: {
            fontSize: 13,
          },
        }}>
        <bottomTab.Screen
          component={this.attractionStackScreen}
          options={{
            tabBarIcon: () => {
              // TODO: put image icon here
              // <Image source={require("path")} />
            },
          }}
          name="Objek Wisata"
        />

        <bottomTab.Screen
          component={this.testScreenStack}
          options={{
            tabBarIcon: () => {
              // <Image source={require("path")}
            },
          }}
          name="Akomodasi"
        />

        <bottomTab.Screen
          component={this.testScreenStack}
          options={{
            tabBarIcon: () => {
              // <Image source={require("path")}
            },
          }}
          name="My Trip"
        />

        <bottomTab.Screen
          component={this.profileScreenStack}
          options={{
            tabBarIcon: () => {
              // <Image source={require("path")}
            },
          }}
          name="Profile"
        />
      </bottomTab.Navigator>
    );
  }
}

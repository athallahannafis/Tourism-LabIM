import React, {Component} from 'react';
import { View, Image } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screen
import TestScreen from './screens/Test';
import AttractionHome from './screens/attraction-home';

const testStack = createStackNavigator();
const bottomTab = createBottomTabNavigator();
const attractionStack = createStackNavigator();

export default class BottomTab extends Component {
  constructor(props) {
    super(props);
  }

  testScreenStack = (props) => {
    return(
      <testStack.Navigator>
        <testStack.Screen component={TestScreen}
        name="Test screen"/>
      </testStack.Navigator>
    )
  }

  attractionStackScreen = (props) => {
    return (
      <attractionStack.Navigator screenOptions={{
        headerStyle: {backgroundColor: "#2E99A3"},
        headerTintColor: "white",
      }}>
        <attractionStack.Screen component={AttractionHome}
        name="Objek Wisata dan Destinasi"/>
      </attractionStack.Navigator>
    )
  }

  render() {
    return (
      <bottomTab.Navigator
      tabBarOptions={{
        style: {
          height: "10%"
        },
        labelStyle: {
          fontSize: 13
        },
      }}>
        <bottomTab.Screen component={this.attractionStackScreen}
        options={{
          tabBarIcon: () => {
            // TODO: put image icon here
            // <Image source={require("path")} />
          }
        }}
        name="Objek Wisata"/>

        <bottomTab.Screen component={this.testScreenStack}
        options={{
          tabBarIcon: () => {
            // <Image source={require("path")}
          }
        }}
        name="Akomodasi"/>

        <bottomTab.Screen component={this.testScreenStack}
        options={{
          tabBarIcon: () => {
            // <Image source={require("path")}
          }
        }}
        name="My Trip"/>

        <bottomTab.Screen component={this.testScreenStack}
        options={{
          tabBarIcon: () => {
            // <Image source={require("path")}
          }
        }}
        name="Profile"/>
      </bottomTab.Navigator>
    )
  }
}
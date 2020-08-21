import React, {Component} from 'react';
import { View, Image } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screen
import TestScreen from './screens/Test';

const testStack = createStackNavigator();
const bottomTab = createBottomTabNavigator();

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
        <bottomTab.Screen component={this.testScreenStack}
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
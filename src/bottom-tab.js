import React, {Component} from 'react';
import { View } from 'react-native';

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
      <bottomTab.Navigator>
        <bottomTab.Screen component={this.testScreenStack}
        name="Test 1"/>
        <bottomTab.Screen component={this.testScreenStack}
        name="Test 2"/>
        <bottomTab.Screen component={this.testScreenStack}
        name="Test 3"/>
      </bottomTab.Navigator>
    )
  }
}
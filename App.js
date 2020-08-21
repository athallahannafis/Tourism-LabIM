/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

// Bottom tab
import BottomTab from './src/bottom-tab';


export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTab/>
      </NavigationContainer>
    )
  }
}
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import SettingsScreen from './components/screens/SettingsScreen';
import HomeScreen from './components/screens/HomeScreen';

import { useState } from 'react';

import {
  Text,
  View,
} from 'react-native';

import BluetoothTestScreen from './components/screens/BluetoothTestScreen';

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Bluetooth Test" component={BluetoothTestScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
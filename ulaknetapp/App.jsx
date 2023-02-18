import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import TabNavigation from './components/TabNavigation';

import { useState } from 'react';

import {
  Text,
  View,
} from 'react-native';

function App() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}

export default App;
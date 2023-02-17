/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';




function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isBluetoothAvailable, setBluetoothAvailable] = useState(false);

  function handleClick() {
     setBluetoothAvailable( RNBluetoothClassic.isBluetoothAvailable() );
  }

  return (
    <SafeAreaView >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">

        
        <View>
        <Text>ULAK NETTT</Text>
        <Button title='Test Bluetooth' onPress={handleClick}/>

        <Text> { isBluetoothAvailable ? "Available" : "Not available" } </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

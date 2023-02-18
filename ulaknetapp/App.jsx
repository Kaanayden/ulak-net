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

import { PermissionsAndroid } from 'react-native';

import BleManager from 'react-native-ble-manager';

const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Access fine location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const requestBluetoothPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: 'Access  location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};
const requestBluetoothConnectPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: 'Access  location required for discovery',
      message:
        'In order to perform discovery, you must enable/allow ' +
        'fine location access.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};



function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [isBluetoothAvailable, setBluetoothAvailable] = useState(false);
  const [deviceNamesString, setDeviceNamesString ] = useState("First discover!");
  const [discovering, setDiscovering] = useState(false);

  async function handleClick() {

    requestAccessFineLocationPermission();
    requestBluetoothPermission();
    
    requestBluetoothConnectPermission();
  }

  async function handleOpenDiscover() {
    const devices = await RNBluetoothClassic.getConnectedDevices();
    const deviceNames = devices.map( device => device.name );
     setDeviceNamesString( deviceNames.length )
  }

  async function handleDiscover() {
    setDiscovering(true);
    const devices = await RNBluetoothClassic.startDiscovery()
    const deviceNames = devices.map( device => device.name );
     setDeviceNamesString( deviceNames.length )
     setDiscovering(false)
  }

  async function handleDiscover() {
    const devices = await BleManager.scan([], 5);
    
  }

  return (
    <SafeAreaView >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">

        
        <View>
        <Text>ULAK NET</Text>
        <Text>{discovering ? "Discovering" : "Not discovering"}</Text>
        <Button title='Test Bluetooth' onPress={handleClick}/>
        <Button title='Discover' onPress={handleDiscover}/>
        <Button title='Toast' onPress={handleOpenDiscover}/>


        <Text> { isBluetoothAvailable ? "Available" : "Not available" } </Text>
        <Text> {deviceNamesString} </Text>
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

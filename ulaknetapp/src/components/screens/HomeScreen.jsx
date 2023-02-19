import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import permissionRequests from '../../utils/permissionRequests';
import { Button } from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';

import { useEffect, useState } from 'react'
 
async function requestPermissions() {
  await permissionRequests.requestAccessFineLocationPermission();
  await permissionRequests.requestBluetoothConnectPermission();
  await permissionRequests.requestBluetoothPermission();
}

function HomeScreen({ navigation }) {
  const [location, setLocation] = useState({})
  const [isLocationLoading, setIsLocationLoading] = useState(true)

  useEffect(() => {
    async function hasLocationPermission() {
      return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    }

    if (hasLocationPermission()) {
      Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              ...position
            })
            setIsLocationLoading(false)
            console.log(location)
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <Button onPress={requestPermissions} >İzin Al Butonu</Button>
      <Text style={styles.text}>Durumunuz Nasıl?</Text>
      <Button
        buttonColor='#bd1f0d'
        style={styles.button} 
        icon="hospital-box" 
        mode="contained"
        onPress={() => {
          navigation.navigate("broadcast", {
            message : `Yaralıyım. Koordinatlar: ${location.coords.latitude}, ${location.coords.longitude}`,
          })
        }}
       >
        Yaralıyım
       </Button>
      <Button
        buttonColor='saddlebrown'
        style={styles.button} 
        icon="home-alert" 
        mode="contained"
        onPress={() => {
          navigation.navigate("broadcast", {
            message : `Enkaz Altındayım. Koordinatlar: ${location.coords.latitude}, ${location.coords.longitude}`,
          })
        }}
       >
        Enkaz Altındayım
       </Button>
      <Button 
        buttonColor='royalblue'
        style={styles.button} 
        icon="food" 
        mode="contained"
        onPress={() => {
          navigation.navigate("broadcast", {
            message : `Gıdaya İhtiyacım Var. Koordinatlar: ${location.coords.latitude}, ${location.coords.longitude}`,
          })
        }}
       >
        Gıdaya İhtiyacım Var
       </Button>
      <Button 
        buttonColor='forestgreen'
        style={styles.button} 
        icon="check" 
        mode="contained"
        onPress={() => {
          navigation.navigate("broadcast", {
            message : `İyiyim. Koordinatlar: ${location.coords.latitude}, ${location.coords.longitude}`,
          })
        }}
       >
        İyiyim
       </Button>
       <Text>Konum</Text>
       {!isLocationLoading && (
          <>
            <Text>{location.coords.latitude}</Text>
            <Text>{location.coords.longitude}</Text>
          </>
       )}
       {isLocationLoading && (
          <Text>Yükleniyor...</Text>
       )}
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    borderRadius: 10,
    width: '96%',
    marginVertical: 4,
  },
  text: {
    fontSize: 20, 
    fontWeight: 700, 
    padding: 20
  }
})

export default HomeScreen;
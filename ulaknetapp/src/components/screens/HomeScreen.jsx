import {
  Text,
  View,
  StyleSheet,

} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import permissionRequests from '../../utils/permissionRequests';
import { Button } from 'react-native-paper';


function requestPermissions() {
  permissionRequests.requestAccessFineLocationPermission();
  permissionRequests.requestBluetoothConnectPermission();
  permissionRequests.requestBluetoothPermission();
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={requestPermissions} ></Button>
      <Text style={styles.text}>Durumunuz Nasıl?</Text>
      <Button
        buttonColor='#bd1f0d'
        style={styles.button} 
        icon="hospital-box" 
        mode="contained"
        onPress={() => console.log("Test")}
       >
        Yaralıyım
       </Button>
      <Button
        buttonColor='saddlebrown'
        style={styles.button} 
        icon="home-alert" 
        mode="contained"
       >
        Enkaz Altındayım
       </Button>
      <Button 
        buttonColor='royalblue'
        style={styles.button} 
        icon="food" 
        mode="contained"
       >
        Gıdaya İhtiyacım Var
       </Button>
      <Button 
        buttonColor='forestgreen'
        style={styles.button} 
        icon="check" 
        mode="contained"
       >
        İyiyim
       </Button>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start', 
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
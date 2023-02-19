import { FlatList, View, } from "react-native"
import { List, Divider, Text } from 'react-native-paper';

import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';

import { data } from "../../data";
import { useEffect, useState } from "react";

function ChatList({ navigation }) {

  const [bondedDevices, setBondedDevices] = useState([]);
  const [accepting, setAccepting] = useState(false);


  useEffect(() => {

    const refreshLoop = setInterval(() => {
        try {
            refreshDevices();
        } catch (e) {

        }

    }, 2000);

    const acceptLoop = setInterval( () => {
      try{
        if(!accepting) {
          acceptConnections();
        }
        
      } catch(e) {

      }
    }, 1000 );

    return () => {
        clearInterval(refreshLoop);
        clearInterval(acceptLoop);
    }
}, []);


  async function acceptConnections() {
    setAccepting(true);
  
    try {
        const device = await RNBluetoothClassic.accept({});
    } catch (error) {
        // Handle error accordingly
    } finally {
        setAccepting(false);
    }
  }

  async function handleChat(device) {
    navigation.navigate("ChatScreen", {
      deviceAddress: device.address,
    });
  }

  async function refreshDevices() {
    const devices = await RNBluetoothClassic.getBondedDevices();
    for (let i = 0; i < devices.length; i++) {
        devices[i].connected = await devices[i].isConnected();
    
    }
    setBondedDevices(devices);
    try{
      devices.forEach( (device) => {
        try{
        device.connect();
        } catch(e) {
          
        }
      } )
    } catch(e) {

    }
}


  return (
    <View>

      <FlatList
        data={bondedDevices}
        keyExtractor={item => item.id}
        renderItem={(item) => {
          return (<List.Item
            title={item.item.name}
            description={item.item.id + " " + (item.item.connected ? "Connected" : "Not Connected")}
            left={props => <List.Icon {...props} icon="bluetooth" />}
            onPress={() => handleChat(item.item)}
          />)
        }}
      />
{/*
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <>
            <List.Item
              title={item.name}
              description={item._id}
              left={props => <List.Icon {...props} icon="account" />}
              onPress={() => handleChat(item.item)}
            />
            <Divider />
          </>
        )}
        keyExtractor={(item) => item._id}
      />

        */}
    </View>
  )
}

export default ChatList;
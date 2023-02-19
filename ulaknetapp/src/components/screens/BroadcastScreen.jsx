import {
  Text,
  View,
  DrawerLayoutAndroid,
  FlatList,
  ToastAndroid
} from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react'
import { Appbar, List, Divider, Drawer } from 'react-native-paper';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic'

import { GiftedChat } from 'react-native-gifted-chat';

const user = {
  _id: Math.floor(Math.random() * 10000),
}
function BroadcastScreen({ navigation }) {

  const drawer = useRef(null)
  const [messages, setMessages] = useState([]);

  const [bondedDevices, setBondedDevices] = useState([]);
  const [accepting, setAccepting] = useState(false);

  const [messageListener, setMessageListener] = useState(new Map());


  useEffect(() => {

    const refreshLoop = setInterval(() => {
      try {
        refreshDevices();
      } catch (e) {

      }

    }, 2000);

    const acceptLoop = setInterval(() => {
      try {
        if (!accepting) {
          acceptConnections();
        }

      } catch (e) {

      }
    }, 1000);

    return () => {
      clearInterval(refreshLoop);
      clearInterval(acceptLoop);
      messageListener.forEach( (value) => {
        if(value) {
          value.remove();
        }

      } )
    }
  }, []);






  async function subscribeToDevice(device) {

      const isConnected = await device.isConnected();
      
      if (!messageListener.get(device.address) && isConnected) {
        
        const listener = device.onDataReceived((event) => {
          console.log("event", event);
          onReceiveEvent(event);
        });
        messageListener.set(device.address, listener);
        ToastAndroid.show( "Cihaza bağlanıldı: " + device.address, ToastAndroid.SHORT)
      }


  }

  //console.log("message listener", messageListener)

  async function onReceiveEvent(event) {
    console.log("new message", event);
    if (!messages.some(element => JSON.stringify(element) === event.data)) {
      setMessages((current) => [JSON.parse(event.data), ...current]);
    }

  }

  async function onSend(newMessages) {

    const stringified = JSON.stringify(newMessages[0]);
    bondedDevices.forEach( async (device) => {
      await sendMessage(device, stringified);
    } )
    

    setMessages((current) => [...newMessages, ...current]);
  }

  async function sendMessage(device, message) {
    const isSent = await device.write(message + "\n");
    console.log("isSent", isSent);
  }



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


  async function refreshDevices() {
    const devices = await RNBluetoothClassic.getBondedDevices();
    for (let i = 0; i < devices.length; i++) {
      devices[i].connected = await devices[i].isConnected();

    }
    setBondedDevices(devices);
    try {
      devices.forEach( async (device) => {
        try {
          if( device.connected ) {
            await subscribeToDevice(device);
          } else {
            await device.connect();
          }
        } catch (e) {

        }
      })
    } catch (e) {

    }
  }

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={drawerComponent}
    >
      <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 700, padding: 20}}>Yayın</Text>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={user}
        renderAvatar={null}
      //renderUsernameOnMessage={renderUsernameOnMessage}
      />
    </DrawerLayoutAndroid>
  );
}

function drawerComponent() {
  return (
    <Drawer.Section 
      showDivider={false}
      title="Aktif Cihazlar"
    >
      <Drawer.Item
        label="First Item"
        icon="cellphone"
      />
      <Drawer.Item
        label="Second Item"
        icon="cellphone"
      />
    </Drawer.Section>
  )
}

export default BroadcastScreen;
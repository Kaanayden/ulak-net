import {
  Text,
  View,
  DrawerLayoutAndroid,
  FlatList,
  ToastAndroid
} from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react'
import { Drawer, Button } from 'react-native-paper';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic'

import { GiftedChat, Send } from 'react-native-gifted-chat';

const user = {
  _id: Math.floor(Math.random() * 10000),
}
function BroadcastScreen({ route, navigation }) {


  const drawer = useRef(null)
  const [messages, setMessages] = useState([]);

  const [bondedDevices, setBondedDevices] = useState([]);
  const [accepting, setAccepting] = useState(false);

  const [messageListener, setMessageListener] = useState(new Map());

  const[ currentText, setCurrentText ] = useState(null);



  useEffect( () => {
    if(route?.params?.message) {
      
      setCurrentText(route.params.message);
    }

  }, [route?.params] )

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

    const newMessage = newMessages[0];
    newMessage.isPublic = true;
    
    const stringified = JSON.stringify(newMessage);
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
      renderNavigationView={() => drawerComponent(bondedDevices)}
    > 
      <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 700, padding: 20}}>Yayın</Text>
      <GiftedChat
        text={currentText}
        onInputTextChanged={setCurrentText}
        messages={messages.filter( (message) => message.isPublic ) }
        onSend={messages => onSend(messages)}
        user={user}
        renderAvatar={null}
        placeholder='Mesaj Gönder'
        renderSend={(props) => (
          <Send {...props}>
            <View style={{justifyContent: 'center', height: '100%', marginRight: 10}}>
              <Text style={{color: 'dodgerblue', fontWeight: '700', fontSize: 16}}>Gönder</Text>
            </View>
          </Send>
        )}
      //renderUsernameOnMessage={renderUsernameOnMessage}
      />
    </DrawerLayoutAndroid>
  );
}

function drawerComponent(bondedDevices) {
  return (
    <Drawer.Section 
      showDivider={false}
      title="Aktif Cihazlar"
    >
      {bondedDevices.map(device => (
          <Drawer.Item
          label={device.name}
          icon="cellphone"
          key={device.id}
        />
        ))}
    </Drawer.Section>
  )
}

export default BroadcastScreen;
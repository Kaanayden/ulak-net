import { useState, useEffect } from 'react'

import { GiftedChat } from 'react-native-gifted-chat'
import { useCallback } from 'react'
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic'

const user = {
  _id: Math.floor(Math.random() * 10000),
}


  //route.params.device
function ChatScreen({ route }) {
  
 

  const [messages, setMessages] = useState([]);
  const [messageListener, setMessageListener] = useState(null);
  const [device, setDevice] = useState(null);




  useEffect(() => {
    //setMessages(route.params.messages)

    getDeviceFromAddress(route.params.deviceAddress);


    return () => {
      removeMessageListener();
    }
    
  }, [])

  async function getDeviceFromAddress( address ) {
    const newDevice = await RNBluetoothClassic.getConnectedDevice(address)
    await subscribeToDevice(newDevice);
    setDevice(newDevice);
  }

  function removeMessageListener() {
    if(messageListener) {
      messageListener.remove();
    }

  }

  
  

async function subscribeToDevice(device) {
  try{
    const isConnected = await device.isConnected();
    if (!messageListener && isConnected) {
     
        const listener = device.onDataReceived((event) => {
          onReceiveEvent(event);
        });
        setMessageListener(listener);
    }
    //ToastAndroid.show( "Cihaza bağlanıldı: " + device.address, ToastAndroid.SHORT)
  } catch(e) {

  }

}

  async function onReceiveEvent(event) {
    console.log("new message", event);
    if (!messages.some( element => JSON.stringify( element ) === event.data ) ) {
      setMessages( (current) => [ JSON.parse(event.data), ...current ] );
    }
    
  }

  async function onSend(newMessages) {

    const newMessage = newMessages[0];
    newMessage.isPublic = false;
    
    const stringified = JSON.stringify(newMessage);

    sendMessage(device, stringified);

    setMessages( (current) =>  [...newMessages,  ...current] );
  }

  async function sendMessage(device, message) {
    const isSent = await device.write(message + "\n");
    console.log("isSent", isSent);
}

  return (
    <GiftedChat
      messages={messages.filter( (message) => !message.isPublic ) }
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
  )
}

export default ChatScreen;
import {
  Text,
  DrawerLayoutAndroid,
} from 'react-native';
import { useState, useEffect, useRef } from 'react'
import { Drawer } from 'react-native-paper';

import ChatComponent from './../ChatComponent'

function SettingsScreen({ navigation }) {
  const user = {
    _id: 1,
  }
  
  const drawer = useRef(null)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
      {
        _id: 2,
        text: 'Deneme',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
        },
      },
    ])
  }, [])

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={drawerComponent}
    >
      <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 700, padding: 20}}>Yayın</Text>
      <ChatComponent 
        messages={messages} 
        setMessages={setMessages}
        user={user}
        renderUsernameOnMessage={true}
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

export default SettingsScreen
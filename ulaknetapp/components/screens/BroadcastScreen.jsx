import {
  Text,
  View,
} from 'react-native';
import { useState, useEffect } from 'react'
import { Appbar } from 'react-native-paper';

import ChatComponent from './../ChatComponent'

function SettingsScreen({ navigation }) {
  const user = {
    _id: 1,
  }
  
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
    <>
      <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 700, padding: 20}}>Yayın</Text>
      <ChatComponent 
        messages={messages} 
        setMessages={setMessages}
        user={user}
        renderUsernameOnMessage={true}
      />
    </>
  );
}

export default SettingsScreen
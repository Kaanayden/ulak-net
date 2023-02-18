import {
  Text,
  View,
} from 'react-native';

import { useState, useEffect } from 'react'

import ChatComponent from './../ChatComponent'

function SettingsScreen() {
  const user = {
    _id: 2,
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
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  return (
    <ChatComponent 
      messages={messages} 
      setMessages={setMessages}
      user={user}
    />
  );
}

export default SettingsScreen
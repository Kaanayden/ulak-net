import ChatComponent from './../ChatComponent'
import { useState, useEffect } from 'react'

function ChatScreen({ route }) {
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(route.params.messages)
  }, [])

  return (
    <ChatComponent 
      messages={messages}
      setMessages={setMessages}
      user={route.params.user}
    />
  )
}

export default ChatScreen
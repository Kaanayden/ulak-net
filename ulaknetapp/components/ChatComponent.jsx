import { GiftedChat } from 'react-native-gifted-chat'
import { useCallback } from 'react'

function Chat({ messages, setMessages, user, renderUsernameOnMessage }) {
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={user}
      renderAvatar={null}
      renderUsernameOnMessage={renderUsernameOnMessage}
    />
  )
}

export default Chat
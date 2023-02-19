import {
  Text,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatListScreen from './ChatListScreen'
import ChatScreen from './ChatScreen'

const ChatStack = createNativeStackNavigator();

function PrivateChatScreen({ navigation }) {
  return (
    <ChatStack.Navigator
      screenOptions={{ animation: 'none' }}
    >
      <ChatStack.Screen 
        name="ChatListScreen" 
        component={ChatListScreen}
        options={{
          title: "Özel Sohbetler"
        }}
      />
      <ChatStack.Screen 
        name="ChatScreen" 
        component={ChatScreen} 
        options={{
          title: "Sohbet"
        }}
      />
    </ChatStack.Navigator>
  );
}

export default PrivateChatScreen
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FaIcon from 'react-native-vector-icons/dist/FontAwesome';
import Fa5Icon from 'react-native-vector-icons/dist/FontAwesome5';

import BroadcastScreen from './screens/BroadcastScreen';
import HomeScreen from './screens/HomeScreen';
import PrivateChatScreen from './screens/PrivateChatScreen';


const Tab = createMaterialBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Anasayfa"
      backBehavior="history"
    >
      <Tab.Screen 
        name="home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Anasayfa',
          tabBarIcon: ({ color, size }) => (
            <FaIcon name="home" size={24} color="#333" />
          ),
        }}
      />
      <Tab.Screen 
        name="broadcast" 
        component={BroadcastScreen} 
        options={{
          tabBarLabel: 'Yayın',
          tabBarIcon: ({ color, size }) => (
            <Fa5Icon name="broadcast-tower" size={24} color="#333" />
          ),
        }}
      />
      <Tab.Screen 
        name="private-chat" 
        component={PrivateChatScreen} 
        options={{
          tabBarLabel: 'Özel Sohbet',
          tabBarIcon: ({ color, size }) => (
            <FaIcon name="wechat" size={24} color="#333" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
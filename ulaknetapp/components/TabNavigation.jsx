import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import BroadcastScreen from './screens/BroadcastScreen';
import HomeScreen from './screens/HomeScreen';
import PrivateChatScreen from './screens/PrivateChatScreen';
import BluetoothTestScreen from './screens/BluetoothTestScreen';

const Tab = createMaterialBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Anasayfa" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Anasayfa',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={24} color="#333" />
          ),
        }}
      />
      <Tab.Screen 
        name="Yayın" 
        component={BroadcastScreen} 
        options={{
          tabBarLabel: 'Yayın',
          tabBarIcon: ({ color, size }) => (
            <Icon name="podcast" size={24} color="#333" />
          ),
        }}
      />
      <Tab.Screen 
        name="Özel Sohbet" 
        component={PrivateChatScreen} 
        options={{
          tabBarLabel: 'Özel Sohbet',
          tabBarIcon: ({ color, size }) => (
            <Icon name="wechat" size={24} color="#333" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
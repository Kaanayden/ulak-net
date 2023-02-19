//should be in top for drawer navigation
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';


import TabNavigation from './src/components/TabNavigation';
import { Provider as PaperProvider } from 'react-native-paper';


function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
import { FlatList, View,} from "react-native"
import { List, Divider, Text } from 'react-native-paper';

import { data } from "../../data";

function ChatList({ navigation }) {
  const user = {
    _id: 1,
  }
  
  const contacts = data.map(item => {
    return item.contact;
  })

  const getChatWith = (id) => {
    const filteredData = data.filter(el => el.contact._id == id)
    return filteredData[0].chat
  }

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <>
            <List.Item
              title={item.name}
              description={item._id}
              left={props => <List.Icon {...props} icon="account" />}
              onPress={() => navigation.navigate('ChatScreen', {
                 user,
                 messages: getChatWith(item._id)
              })}
            />
            <Divider />
          </>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  )
}

export default ChatList
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
const RenderList = (results) => {
  return (
    <FlatList
      data={results}
      keyExtractor={item => item.place_id}
      renderItem={(
        {item}, // {({item}) => <Text onPress={setPlaceName(item.description)}>{item.description}</Text>}
      ) => (
        <TouchableOpacity
          onPress={() => handleOnPress(item)}
          style={
            ({
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            },
            item.description === placeName ? {backgroundColor: '#eaeaea'} : {}) // Conditional background color
          }>
          <Text>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default RenderList;

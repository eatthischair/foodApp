import React, {useState} from 'react';
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
// import {FlatList} from 'react-native-gesture-handler';

// const {width, height} = Dimensions.get('window');
const RenderFollowList = ({route}) => {
  const navigation = useNavigation();

  const {follow} = route.params;
  return (
    <FlatList
      data={follow}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('FriendsProfile', {username: item})}
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            backgroundColor: '#eaeaea', // Conditional background color
          }}>
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  ratingsObj: {},
});

export default RenderFollowList;

import React, {useState} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native';
// import { useFunction } from './FunctionContext'; // Import the custom hook

import {createNativeStackNavigator} from '@react-navigation/native-stack';

function AddNewReviewScreen({navigation}) {
  const handleNavigation = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <TextInput
        placeholder="Restaurant Name"
        value={name}
        onChangeText={handleNameChange}
      /> */}

      <Text>Overall Rating</Text>
      <AirbnbRating
        count={5}
        reviews={['', '', '', '', '']}
        defaultRating={3}
        size={25}
      />
      <Text>Service</Text>
      <AirbnbRating
        count={5}
        reviews={['', '', '', '', '']}
        defaultRating={3}
        size={25}
      />
      <Text>Cleanliness</Text>
      <AirbnbRating
        count={5}
        reviews={['', '', '', '', '']}
        defaultRating={3}
        size={25}
      />
      <Text>Price</Text>
      <AirbnbRating
        count={5}
        reviews={['', '', '', '', '']}
        defaultRating={3}
        size={25}
      />
      <Text>Taste</Text>
      <AirbnbRating
        count={5}
        reviews={['', '', '', '', '']}
        defaultRating={3}
        size={25}
      />
      {/* <TextInput
        placeholder="Other Comments"
        value={name}
        onChangeText={handleNameChange}
      />
      <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  );
}

export default AddNewReviewScreen;

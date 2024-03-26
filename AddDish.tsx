import React, {useState} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native';

function AddDish({navigation}) {
  // const CustomTouchable = ({title, onPress}) => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.buttons}
  //       onPress={onPress}
  //       activeOpacity={0.8}>
  //       <Text style={styles.buttonText}>{title}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // const handleSubmit = () => {
  //   // Handle form submission logic here, such as sending data to a server
  //   console.log('Name:', name);
  //   console.log('Email:', email);
  // };

  // const ReviewDishScreen = () => {
  //   const handleNavigation = screenName => {
  //     navigation.navigate(screenName);
  //   };

  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <CustomTouchable
  //         title="Add New Review"
  //         onPress={() => handleNavigation('AddNewReview')}
  //       />
  //     </View>
  //   );
  // };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <TextInput
        placeholder="Restaurant Name"
        value={name}
        onChangeText={handleNameChange}
      /> */}
      {/* <Stack.Screen name="ReviewDishScreen" component={ReviewDishScreen} /> */}

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

export default AddDish;

import React, {useState, useEffect} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {RatingInput} from 'react-native-stock-star-rating';

// import {TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('window');

function AddDish({route, navigation}) {
  const CustomTouchable = ({title, onPress}) => {
    return (
      <TouchableOpacity
        style={styles.buttons}
        onPress={onPress}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const {onAddDish} = route.params;
  const handleSubmit = () => {
    let dishObj = {
      name: query,
      comments,
      ratings: ratings[0],
    };
    onAddDish(dishObj);
    setQuery('');
    setComments('');
    setRatings(initialRatings);
    navigation.navigate('AddNewReview');
    // navigation.goBack();
  };

  const [query, setQuery] = useState('');
  const [comments, setComments] = useState('');
  const initialRatings = [{label: 'Overall', value: 0}];
  const [ratings, setRatings] = React.useState(initialRatings);

  const updateRating = (index, newValue) => {
    const newRatings = ratings.map((item, i) => {
      if (i === index) {
        return {...item, value: newValue};
      }
      return item;
    });
    setRatings(newRatings);
  };

  const styles = StyleSheet.create({
    buttonText: {
      color: 'black',
      fontSize: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textBox: {
      // display: 'flex',
      height: height / 8,
      width: width / 2,
      borderColor: 'black',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        placeholder="Dish name"
        onChangeText={text => setQuery(text)}
        value={query}
      />
      {ratings.map((item, index) => (
        <React.Fragment key={index}>
          <Text style={styles.buttonText}>{item.label}</Text>
          <RatingInput
            rating={item.value}
            setRating={newValue => updateRating(index, newValue)}
            size={40}
            maxStars={5}
            bordered={false}
          />
        </React.Fragment>
      ))}
      <TextInput
        placeholder="Comments"
        value={comments}
        onChangeText={text => setComments(text)}
      />
      <CustomTouchable title="Submit" onPress={() => handleSubmit()} />
    </View>
  );
}

export default AddDish;

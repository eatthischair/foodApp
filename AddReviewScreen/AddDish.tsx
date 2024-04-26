import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Stars from 'react-native-stars';
import {useUser} from '../UserContext'; // Path to your UserContext
import {addDishStyles} from './AddNewRevStyles';

function AddDish({route, navigation}) {
  const {CustomTouchable} = useUser();
  const {onAddDish} = route.params;
  const [query, setQuery] = useState('');
  const [comments, setComments] = useState('');
  const initialRatings = [{label: 'Overall', value: 0}];
  const [ratings, setRatings] = React.useState(initialRatings);

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
  };

  const updateRating = (index, newValue) => {
    const newRatings = ratings.map((item, i) => {
      if (i === index) {
        return {...item, value: newValue};
      }
      return item;
    });
    setRatings(newRatings);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        placeholder="Dish name"
        onChangeText={text => setQuery(text)}
        value={query}
      />
      {ratings.map((item, index) => (
        <React.Fragment key={index}>
          <Text style={addDishStyles.buttonText}>{item.label}</Text>
          <Stars
            half={true}
            default={0}
            update={newValue => updateRating(index, newValue)}
            spacing={6}
            starSize={50}
            count={5}
            fullStar={require('../android/app/src/main/res/drawable/Stars/starFilled.png')}
            emptyStar={require('../android/app/src/main/res/drawable/Stars/starEmpty.png')}
            halfStar={require('../android/app/src/main/res/drawable/Stars/starHalf.png')}
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

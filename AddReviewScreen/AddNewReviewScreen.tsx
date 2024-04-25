/* eslint-disable react/self-closing-comp */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../UserContext'; // Path to your UserContext

import Stars from 'react-native-stars';
import styles from './AddNewRevStyles';
import GetDataAsync from '../MiscFuns/GetDataAsync';
import StoreDataAsync from '../MiscFuns/StoreDataAsync';

function AddNewReviewScreen({route, navigation}) {
  const {CustomTouchable} = useUser();
  // const [searchQuery, setSearchQuery] = useState('');
  // const [filteredData, setFilteredData] = useState([]);

  // const {userId, setUserId} = useUser();
  const {username} = useUser();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [placeName, setPlaceName] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [coords, setCoords] = useState('');
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [text, setText] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [tags, setTags] = useState('');

  const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

  const [dishes, setDishes] = useState([]);
  const addDishCallback = newDishData => {
    // console.log('newidhsdata', newDishData, dishes);
    setDishes(prevDishes => [...prevDishes, newDishData]);
  };

  const fetchPlaces = async searchQuery => {
    if (searchQuery.length < 3) return; // Don't search for too short strings
    //later add an error msg
    try {
      const response = await axios.get(googlePlacesApiUrl, {
        params: {
          input: searchQuery,
          types: 'establishment', // Search for places that are businesses.
          location: '32.7767,-96.7970', // Central coordinates for Dallas
          radius: 50000, // Define the search radius in meters
          key: 'AIzaSyCvOCWqc-IOvr5C7FZo7IO8oIvSz5aR6Hk',
        },
      });

      if (response.data && response.data.predictions) {
        // console.log('RESTAURANT RESULTS', response.data.predictions);
        placesList = response.data.predictions;
        setResults(response.data.predictions);
      }
    } catch (error) {
      console.error('error boss', error);
    }
  };

  useEffect(() => {
    if (query && query.length >= 3 && !searchCompleted) {
      const timerId = setTimeout(() => {
        fetchPlaces(query);
      }, 500); // Debounce the API call

      return () => clearTimeout(timerId);
    }
  });

  const initialRatings = [
    {label: 'Overall', value: 0},
    {label: 'Server Helpfulness', value: 0},
    {label: 'Timeliness of Service', value: 0},
    {label: 'Eagerness to Revisit', value: 0},
    {label: 'Cleanliness', value: 0},
    {label: 'Bang for Buck', value: 0},
    {label: 'Music', value: 0},
    {label: 'Noise Level', value: 0},
    {label: 'Crowd Management', value: 0},
    {label: 'Vibe', value: 0},
  ];
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
  const handleSubmit = () => {
    let sendObj = {
      placeName,
      placeId,
      coords,
      ratings,
      Comments: text,
      dishes,
      favorite,
      username,
      createdAt: new Date(),
      tags: tags !== undefined ? tags?.split(',') : [],
    };

    firestore()
      .collection('test1')
      .add(sendObj)
      .then(() => {
        setPlaceName('');
        setPlaceId('');
        setCoords('');
        setRatings(initialRatings);
        setText('');
        updateAsyncStore(sendObj);
        Alert.alert('Review Posted', 'Your Review Was Posted!!!!!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Map'),
          },
        ]);
      });
  };

  const updateAsyncStore = async sendObj => {
    let revs = await GetDataAsync('revs');
    let newRevs = [...revs, sendObj];
    StoreDataAsync(newRevs, null);
  };
  const apiKey = 'AIzaSyCvOCWqc-IOvr5C7FZo7IO8oIvSz5aR6Hk'; // API Key

  const handleOnPress = item => {
    setPlaceName(item.description);
    setPlaceId(item.place_id);
    setSearchCompleted(true);
    setResults('');
    setQuery('');
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&fields=name,geometry&key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const placeDetails = data.result;
          const coordinates = placeDetails.geometry.location;
          setCoords(coordinates);
          // Use these coordinates to place a marker on the map
        } else {
          console.error('Place Details request failed:', data.status);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={styles.ScrollView}
      scrollEnabled={true}>
      <TextInput
        style={styles.textInput}
        placeholder="Search for restaurants..."
        onChangeText={text => setQuery(text)}
        value={query}
      />
      <CustomTouchable
        title="Add Dish"
        onPress={() =>
          navigation.navigate('AddDish', {onAddDish: addDishCallback})
        }></CustomTouchable>
      <Text>Dishes</Text>
      <Text>{placeName}</Text>
      {placeName ? (
        ''
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.place_id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleOnPress(item)}
              style={
                (styles.TouchableOpacity,
                item.description === placeName
                  ? {backgroundColor: '#eaeaea'}
                  : {}) // Conditional background color
              }>
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {ratings.map((item, index) => (
        <React.Fragment key={index}>
          <Text style={styles.buttonText}>{item.label}</Text>
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
        style={styles.textBox}
        placeholder="Share details of your own experience of this place"
        value={text}
        onChangeText={newText => setText(newText)}
      />
      <TextInput
        style={styles.textBox}
        placeholder="Add Tags (separate by comma)"
        value={tags}
        onChangeText={newText => setTags(newText)}
      />
      <CustomTouchable title=" + Chewiest" onPress={() => setFavorite(true)} />
      <CustomTouchable title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}
export default AddNewReviewScreen;

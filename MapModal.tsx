import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const MapModal = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [coords, setCoords] = useState('');

  const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  let placesList;
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
        placesList = response.data.predictions;
        console.log('REUSLTS', response.data.predictions);
        setResults(response.data.predictions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (query && query.length >= 3) {
      const timerId = setTimeout(() => {
        fetchPlaces(query);
      }, 500); // Debounce the API call

      return () => clearTimeout(timerId);
    }
  });

  const handleOnPress = item => {
    const apiKey = 'AIzaSyCvOCWqc-IOvr5C7FZo7IO8oIvSz5aR6Hk'; // API Key

    console.log('item', item.place_id);
    setPlaceName(item.description);
    setPlaceId(item.place_id);
    setResults('');
    setQuery('');
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&fields=name,geometry&key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const placeDetails = data.result;
          const coordinates = placeDetails.geometry.location;
          console.log('Coordinates:', coordinates);
          setCoords(coordinates);
          // Use these coordinates to place a marker on the map
          let sendObj = {
            placeName: item.description,
            placeId: item.place_id,
            coords: placeDetails.geometry.location,
          };
          firestore()
            .collection('test2')
            .add(sendObj)
            .then(() => {
              // console.log('success!!!!!!!');
              // setPlaceName('');
              // setPlaceId('');
              // setCoords('');
              // setText('');
              // Alert.alert('Review Posted', 'Your Review Was Posted!!!!!', [
              //   {
              //     text: 'OK',
              //     onPress: () => navigation.navigate('Map'),
              //   },
              // ]);
            });
        } else {
          console.error('Place Details request failed:', data.status);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <View>
      <TextInput
        placeholder="Search for restaurants..."
        onChangeText={text => setQuery(text)}
        value={query}
      />
      <Text>{placeName}</Text>
      {placeName ? (
        ''
      ) : (
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
                item.description === placeName
                  ? {backgroundColor: '#eaeaea'}
                  : {}) // Conditional background color
              }>
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
export default MapModal;

import React, {useState, useEffect} from 'react';
import {RatingInput} from 'react-native-stock-star-rating';

import {
  View,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RestaurantNames from './RestaurantNames.tsx';
import axios from 'axios';

function AddNewReviewScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [placeName, setPlaceName] = useState('');
  const [coords, setCoords] = useState('');
  console.log('placename', placeName);
  const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

  useEffect(() => {
    // Filter the dataArray based on the searchQuery
    if (searchQuery.trim()) {
      const filtered = RestaurantNames.filter(line =>
        line.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered.slice(0, 10));
    } else {
      setFilteredData([]);
    }
  }, [searchQuery]);

  const fetchPlaces = async searchQuery => {
    if (searchQuery.length < 3) return; // Don't search for too short strings

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
        setResults(response.data.predictions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchPlaces(query);
    }, 500); // Debounce the API call

    return () => clearTimeout(timerId);
  }, [query]);

  const [placeId, setPlaceId] = useState('');

  const apiKey = 'AIzaSyCvOCWqc-IOvr5C7FZo7IO8oIvSz5aR6Hk'; // API Key

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,geometry&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const placeDetails = data.result;
        const coordinates = placeDetails.geometry.location;
        console.log('Coordinates:', coordinates);
        setCoords(coordinates);
        // Use these coordinates to place a marker on the map
      } else {
        console.error('Place Details request failed:', data.status);
      }
    })
    .catch(error => console.error('Error:', error));
  const [rating, setRating] = React.useState(0);
  const [rating2, setRating2] = React.useState(0);
  const [rating3, setRating3] = React.useState(0);
  const [rating4, setRating4] = React.useState(0);
  const [rating5, setRating5] = React.useState(0);
  const [rating6, setRating6] = React.useState(0);
  const [rating7, setRating7] = React.useState(0);

  //service quality

  const handleOnPress = item => {
    console.log('item', item.description, item.place_id);
    setPlaceName(item.description);
    setPlaceId(item.place_id);
  };

  const {width, height} = Dimensions.get('window');

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

  const styles = StyleSheet.create({
    buttonText: {
      color: 'black',
      fontSize: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttons: {
      alignItems: 'center', // Center children horizontally
      justifyContent: 'center', // Center children vertically
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      color: 'blue',
      height: height / 15,
      width: width / 2,
      // textAlign: 'center',
      backgroundColor: '#03a9fc',
      marginVertical: 3,
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
    searchBar: {
      width: width / 2,
    },
  });
  return (
    <ScrollView
      contentContainerStyle={{
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 20,
        padding: 20, // Other styles for the content container can also go here
      }}
      scrollEnabled={true}>
      {/* <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Text>{item}</Text>}
        scrollEnabled={false}
      /> */}
      <TextInput
        placeholder="Search for restaurants..."
        onChangeText={text => setQuery(text)}
        value={query}
      />
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
      <Text style={styles.buttonText}>Overall Rating</Text>
      <RatingInput
        rating={rating}
        setRating={setRating}
        size={40}
        maxStars={5}
        bordered={false}
      />
      <Text style={styles.buttonText}>Service</Text>
      <RatingInput
        rating={rating2}
        setRating={setRating2}
        size={40}
        maxStars={5}
        bordered={false}
      />
      <Text style={styles.buttonText}>Cleanliness</Text>
      <RatingInput
        rating={rating3}
        setRating={setRating3}
        size={40}
        maxStars={5}
        bordered={false}
      />
      <Text style={styles.buttonText}>Price</Text>
      <RatingInput
        rating={rating4}
        setRating={setRating4}
        size={40}
        maxStars={5}
        bordered={false}
      />
      <Text style={styles.buttonText}>Taste</Text>
      <RatingInput
        rating={rating5}
        setRating={setRating5}
        size={40}
        maxStars={5}
        bordered={false}
      />
      <Text style={styles.buttonText}>Noise Level</Text>
      <RatingInput
        rating={rating6}
        setRating={setRating6}
        size={40}
        maxStars={5}
        bordered={false}
      />
      <Text style={styles.buttonText}>Vibe</Text>
      <RatingInput
        rating={rating7}
        setRating={setRating7}
        size={40}
        maxStars={5}
        bordered={false}
      />
      <TextInput
        style={styles.textBox}
        placeholder="Share details of your own experience of this place"
        // value={name}
        // onChangeText={handleNameChange}
      />
      <CustomTouchable
        title="Finish Later"
        //  onPress={handleSubmit}
      />
      <CustomTouchable
        title="Submit"
        //  onPress={handleSubmit}
      />
    </ScrollView>
  );
}
export default AddNewReviewScreen;

import React, {useState, useEffect} from 'react';
import {TextInput, FlatList, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

const Autocomplete = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [placeName, setPlaceName] = useState('');
  const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

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

  return (

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
            onPress={() => setPlaceName(item.description)}
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
            <Text allowFontScaling={true} >{item.description}</Text>
          </TouchableOpacity>
        )}
      />

  );
};

export default Autocomplete;

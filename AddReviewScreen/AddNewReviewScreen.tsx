/* eslint-disable react/self-closing-comp */
import React, {useState, useEffect} from 'react';
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
  Alert,
} from 'react-native';

// import {SearchBar} from 'react-native-elements';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import {RatingInput} from 'react-native-stock-star-rating';
import {useUser} from '../UserContext'; // Path to your UserContext

function AddNewReviewScreen({route, navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const {userId, setUserId} = useUser();
  const {username} = useUser();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [placeName, setPlaceName] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [coords, setCoords] = useState('');
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [text, setText] = useState('');
  const [favorite, setFavorite] = useState(false);

  // console.log('placename', placeName);

  const googlePlacesApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
  let placesList;

  const [dishes, setDishes] = useState([]);
  const addDishCallback = newDishData => {
    console.log('newidhsdata', newDishData, dishes);
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
        placesList = response.data.predictions;
        setResults(response.data.predictions);
      }
    } catch (error) {
      console.error(error);
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

  console.log('USERNAME IN ADD NEW REVIEW', username);
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
    };
    console.log('SENDOBJ', sendObj);

    firestore()
      .collection('test1')
      .add(sendObj)
      .then(() => {
        // console.log('success!!!!!!!');
        setPlaceName('');
        setPlaceId('');
        setCoords('');
        setRatings(initialRatings);
        setText('');
        Alert.alert('Review Posted', 'Your Review Was Posted!!!!!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Map'),
          },
        ]);
      });
  };

  const apiKey = 'AIzaSyCvOCWqc-IOvr5C7FZo7IO8oIvSz5aR6Hk'; // API Key

  //service quality

  const handleOnPress = item => {
    console.log('item', item.description, item.place_id, item);
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
          console.log('Coordinates:', coordinates);
          setCoords(coordinates);
          // Use these coordinates to place a marker on the map
        } else {
          console.error('Place Details request failed:', data.status);
        }
      })
      .catch(error => console.error('Error:', error));
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
    listBox: {},
  });
  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 20,
        padding: 20, // Other styles for the content container can also go here
      }}
      scrollEnabled={true}>
      <TextInput
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
      {/* <Text style={styles.buttonText}>Overall Rating</Text> */}
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
        style={styles.textBox}
        placeholder="Share details of your own experience of this place"
        value={text}
        onChangeText={newText => setText(newText)}
      />
      <CustomTouchable
        title="Add to Favorites"
        onPress={() => setFavorite(true)}
      />
      <CustomTouchable title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}
export default AddNewReviewScreen;

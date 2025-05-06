import {
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  View,
  StyleSheet,
} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button,
  BottomNavigation,
  Text,
} from 'react-native-paper';
import { useState } from 'react';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Index() {
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
  const addDishCallback = (newDishData) => {
    setDishes((prevDishes) => [...prevDishes, newDishData]);
  };

  const initialRatings = [
    { label: 'Overall', value: 0 },
    { label: 'Server Helpfulness', value: 0 },
    { label: 'Timeliness of Service', value: 0 },
    { label: 'Eagerness to Revisit', value: 0 },
    { label: 'Cleanliness', value: 0 },
    { label: 'Bang for Buck', value: 0 },
    { label: 'Music', value: 0 },
    { label: 'Noise Level', value: 0 },
    { label: 'Crowd Management', value: 0 },
    { label: 'Vibe', value: 0 },
  ];
  const [ratings, setRatings] = useState(initialRatings);

  const updateRating = (index, newValue) => {
    const newRatings = ratings.map((item, i) => {
      if (i === index) {
        return { ...item, value: newValue };
      }
      return item;
    });
    setRatings(newRatings);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search for restaurants..."
        onChangeText={(text) => setQuery(text)}
        value={query}
      />
      <Button style={styles.button}>
        <Text style={styles.buttonText}>Add Dish</Text>
      </Button>
      <Text style={styles.placeName}>{placeName}</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <Button style={styles.listButton}>{item.description}</Button>
        )}
      />
      <>
        {ratings.map((item, index) => (
          <View key={index} style={styles.ratingContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.starsContainer}>
              <FontAwesome name="star-o" size={24} color="black" />
              <FontAwesome name="star-o" size={24} color="black" />
              <FontAwesome name="star-o" size={24} color="black" />
              <FontAwesome name="star-o" size={24} color="black" />
              <FontAwesome name="star-o" size={24} color="black" />
            </View>
          </View>
        ))}
      </>
      ;
      <TextInput
        style={styles.textInput}
        placeholder="Share details of your own experience of this place"
        value={text}
        onChangeText={(newText) => setText(newText)}
        multiline={true}
        numberOfLines={2}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Add Tags (separate by comma)"
        value={tags}
        onChangeText={(newText) => setTags(newText)}
        multiline={true}
        numberOfLines={2}
      />
      <Button style={styles.button} onPress={() => setFavorite(true)}>
        <Text style={styles.buttonText}>+ Chewiest</Text>
      </Button>
      <Button style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  listButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  placeName: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 10, // Space between each rating item
  },
  label: {
    fontSize: 16,
    textAlign: 'center', // Center the text for a balanced look
    marginBottom: 5, // Space between text and stars
  },
  starsContainer: {
    flexDirection: 'row', // Arrange stars horizontally
    justifyContent: 'center', // Center the stars
    gap: 10, // Space between stars (React Native >= 0.71, or use marginRight below)
  },
});

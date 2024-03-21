import 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import * as React from 'react';
// import {Rating, AirbnbRating} from 'react-native-ratings';

// import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native';
// import {useFunction} from './FunctionContext'; // Import the custom hook

import React, {createContext, useContext, useState, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import FindNewRestaurantScreen from './FindNewRestaurantScreen';
import FriendsReviewsScreen from './FriendsReviewsScreen';
import AddNewReviewScreen from './AddNewReviewScreen';
import YetToReviewScreen from './YetToReviewScreen';
// import AddDish from './AddDish';
import {FunctionProvider} from './FunctionContext'; // Import the provider
import Tweet from './Tweet'; // Assume Tweet is in the same directory
import tweets from './tweets';
import UserProfile from './UserProfile';
import data from './dbDataMONDAY';

import auth from '@react-native-firebase/auth';
import Login from './Login';
import SignupScreen from './SignupScreen';

import Autocomplete from './Autocomplete';

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

const HomeScreen = ({navigation}) => {
  const handleNavigation = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <CustomTouchable
        title="My Reviews"
        onPress={() => handleNavigation('MyReviews')}
      />
      <CustomTouchable
        title="Friends Reviews"
        onPress={() => handleNavigation('FriendsReviews')}
      />
      <CustomTouchable
        title="Find New Restaurant"
        onPress={() => handleNavigation('FindNewRestaurant')}
      />
      <CustomTouchable
        title="Profile"
        onPress={() => handleNavigation('Profile')}
      />
      <CustomTouchable title="Map" onPress={() => handleNavigation('Map')} />
    </View>
  );
};

function MyReviewsScreen({navigation}) {
  const handleNavigation = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>My Reviews Screen</Text>
      <CustomTouchable
        title="Reviewed"
        onPress={() => handleNavigation('Reviewed')}
      />
      <CustomTouchable
        title="Yet To Review"
        onPress={() => handleNavigation('YetToReview')}
      />
      <CustomTouchable
        title="Add New Review"
        onPress={() => handleNavigation('AddNewReview')}
      />
    </View>
  );
}

function Reviewed() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Reviewed Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return <UserProfile></UserProfile>;
}

function AddDish() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Add Dish Screen</Text>
      <Text>Add A Photo Button (Later)</Text>
    </View>
  );
}

const Feed = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [documents, setDocuments] = useState([]);
  const [documents2, setDocuments2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('Restaurants2')
          .get();
        let docs = querySnapshot.docs.map(doc => doc.data());
        docs = docs.filter(place => place.Coordinates !== '');
        docs.map(place => {
          let [latitude, longitude] = place.Coordinates.split(',')
            .slice(0, 16)
            .map(Number);
          place.Coordinates = {
            latitude,
            longitude,
          };
        });
        docs = docs.filter(
          place =>
            !Number.isNaN(place.Coordinates.latitude) &&
            !Number.isNaN(place.Coordinates.longitude),
        );
        setDocuments(docs); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore().collection('YetToVisit').get();
        let docs = querySnapshot.docs.map(doc => doc.data());
        docs = docs.filter(place => place.Coordinates !== '');
        docs.map(place => {
          let [latitude, longitude] = place.Coordinates.split(',')
            .slice(0, 16)
            .map(Number);
          place.Coordinates = {
            latitude,
            longitude,
          };
        });
        docs = docs.filter(
          place =>
            !Number.isNaN(place.Coordinates.latitude) &&
            !Number.isNaN(place.Coordinates.longitude),
        );
        console.log('DOCS2', docs);
        setDocuments2(docs); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };
    fetchData();
  }, []);

  function Map() {
    const image = require('./android/app/src/main/res/drawable/ProfilePics/green-dot.png');
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 32.7767,
            longitude: -96.797,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {documents.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.Coordinates.latitude,
                longitude: marker.Coordinates.longitude,
              }}
              title={marker.Name}
              description={marker.Cuisine}
            />
          ))}
          {documents2.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.Coordinates.latitude,
                longitude: marker.Coordinates.longitude,
              }}
              title={marker['Name of Restaurant']}
              description={marker.Cuisine}
              icon={image}
            />
          ))}
        </MapView>
      </View>
    );
  }

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Sign Up"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Map') {
              iconName = 'map-outline';
            } else if (route.name === 'AddNewReview') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            } else if (route.name === 'Feed') {
              iconName = 'reader-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}>
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="AddNewReview" component={AddNewReviewScreen} />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        {/* <Tab.Screen name="AutoComplete" component={Autocomplete} /> */}
        {/* <Tab.Screen name="AddReviewComposite" component={AddReviewComposite} /> */}
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <FunctionProvider>
      <NavigationContainer>
        {/* <Stack.Navigator initialRouteName="Sign Up"> */}
        {/* <Stack.Navigator initialRouteName="Sign Up"> */}
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{headerShown: false}}
          />
          {/* <Tab.Screen name="Home" component={HomeScreen} /> */}

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up" component={SignupScreen} />
          <Tab.Screen name="MyReviews" component={MyReviewsScreen} />
          <Tab.Screen name="FriendsReviews" component={FriendsReviewsScreen} />
          <Tab.Screen
            name="FindNewRestaurant"
            component={FindNewRestaurantScreen}
          />
          <Tab.Screen name="Reviewed" component={Reviewed} />
          <Tab.Screen name="YetToReview" component={YetToReviewScreen} />

          {/* Add other screens that you don't want to show in the tabs here */}
        </Stack.Navigator>
        {/* <Tab.Navigator
          initialRouteName="Sign Up"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Map') {
                iconName = 'map-outline';
              } else if (route.name === 'AddNewReview') {
                iconName = 'add-circle-outline';
              } else if (route.name === 'Profile') {
                iconName = 'person-outline';
              } else if (route.name === 'Feed') {
                iconName = 'reader-outline';
              }

              // Return the icon component
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="AddNewReview" component={AddNewReviewScreen} />
          <Tab.Screen name="Feed" component={Feed} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Sign Up" component={SignupScreen} /> */}

        {/* <Tab.Screen name="Login" component={Login} /> */}

        {/* <Tab.Screen name="MyReviews" component={MyReviewsScreen} />
          <Tab.Screen name="FriendsReviews" component={FriendsReviewsScreen} />
          <Tab.Screen
            name="FindNewRestaurant"
            component={FindNewRestaurantScreen}
          />
          <Tab.Screen name="Reviewed" component={Reviewed} />
          <Tab.Screen name="YetToReview" component={YetToReviewScreen} />
          <Tab.Screen name="AddDish" component={AddDish} /> */}
        {/* </Tab.Navigator> */}
      </NavigationContainer>
    </FunctionProvider>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // Adjust based on your UI
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
    borderRadius: 8,
    height: height / 15,
    width: width / 2,
    textAlign: 'center',
    backgroundColor: '#03a9fc',
    marginVertical: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default App;

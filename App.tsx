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
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
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
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function AddDish() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Add Dish Screen</Text>
      <Text>Add A Photo Button (Later)</Text>
    </View>
  );
}

// function Map() {
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 32.7767,
//           longitude: -96.797,
//           latitudeDelta: 0.1,
//           longitudeDelta: 0.1,
//         }}
//       >  {data.filter((marker, index) => (
//           if (data[index].Coordinates !== ) {
//           <Marker
//             key={index}
//             coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
//             title={marker.title}
//             description={marker.description}
//           />
//         }
//       ))}</MapView>

//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore().collection('Restaurants').get();
        let docs = querySnapshot.docs.map(doc => doc.data());
        docs.map((place, index) => {
          let coords = place.Coordinates.split(',');
          let arr = [coords[0], coords[1]];
          place.Coordinates = arr;
        });
        docs = docs.filter(places => places.Coordinates[0] !== '');
        setDocuments(docs); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    };

    fetchData();
  }, []);

  function Map() {
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
                latitude: marker.Coordinates[0],
                longitude: marker.Coordinates[1],
              }}
              // title={marker.title}
              // description={marker.description}
            />
          ))}
          {/* <Marker
            coordinate={{latitude: 32.7991667, longitude: -96.7794444}}
            title="Marker Title"
            description="Marker Description"
          /> */}
        </MapView>
      </View>
    );
  }

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
    <Text>{JSON.stringify(documents)}</Text>

    // <FunctionProvider>
    //   <NavigationContainer>
    //     <Tab.Navigator
    //       screenOptions={({route}) => ({
    //         tabBarIcon: ({focused, color, size}) => {
    //           let iconName;

    //           if (route.name === 'Home') {
    //             iconName = 'home';
    //           } else if (route.name === 'Map') {
    //             iconName = 'map-outline';
    //           } else if (route.name === 'AddNewReview') {
    //             iconName = 'add-circle-outline';
    //           } else if (route.name === 'Profile') {
    //             iconName = 'person-outline';
    //           }

    //           // Return the icon component
    //           return <Ionicons name={iconName} size={size} color={color} />;
    //         },
    //         tabBarActiveTintColor: 'blue',
    //         tabBarInactiveTintColor: 'gray',
    //       })}>
    //       <Tab.Screen name="Home" component={HomeScreen} />
    //       {/* <Tab.Screen name="MyReviews" component={MyReviewsScreen} />
    //       <Tab.Screen name="FriendsReviews" component={FriendsReviewsScreen} /> */}
    //       {/* <Tab.Screen
    //         name="FindNewRestaurant"
    //         component={FindNewRestaurantScreen}
    //       /> */}
    //       {/* <Tab.Screen name="Reviewed" component={Reviewed} /> */}
    //       {/* <Tab.Screen name="YetToReview" component={YetToReviewScreen} /> */}
    //       <Tab.Screen name="AddNewReview" component={AddNewReviewScreen} />
    //       <Tab.Screen name="Profile" component={ProfileScreen} />
    //       {/* <Tab.Screen name="AddDish" component={AddDish} /> */}
    //       <Tab.Screen name="Map" component={Map} />
    //     </Tab.Navigator>
    //   </NavigationContainer>
    // </FunctionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
// import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import FindNewRestaurantScreen from './FindNewRestaurantScreen';
import FriendsReviewsScreen from './FriendsReviewsScreen';
import AddNewReviewScreen from './AddNewReviewScreen';
import YetToReviewScreen from './YetToReviewScreen';
// import {UserProvider} from './UserContext'; // Import the provider
import UserProfile from './UserProfile';
import auth from '@react-native-firebase/auth';
import Login from './Login';
import SignupScreen from './SignupScreen';
import Feed from './FeedPage/Feed';
import Map from './Map';
import RenderList from './RenderList';

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

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      // User is logged in
      console.log('User is logged in', user);
      setUser(user);
    } else {
      // User is not logged in
      console.log('User is not logged in');
    }
  }
  // eslint-disable-next-line react/no-unstable-nested-components
  function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Sign Up"
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
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
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="AddNewReview" component={AddNewReviewScreen} />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Profile" component={UserProfile} />
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Sign Up"> */}
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen name="SignUp" component={SignupScreen} />
        )}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Reviews" component={RenderList} />

        <Stack.Screen name="Sign Up" component={SignupScreen} />
        <Tab.Screen name="FriendsReviews" component={FriendsReviewsScreen} />
        <Tab.Screen
          name="FindNewRestaurant"
          component={FindNewRestaurantScreen}
        />
        <Tab.Screen name="YetToReview" component={YetToReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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

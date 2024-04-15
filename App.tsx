import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
// import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import AddNewReviewScreen from './AddReviewScreen/AddNewReviewScreen';
import YetToReviewScreen from './YetToReviewScreen';
// import {UserProvider} from './UserContext'; // Import the provider
import UserProfile from './ProfileScreen/UserProfile';
import auth from '@react-native-firebase/auth';
import Login from './Login/Signup/Login';
import SignupScreen from './Login/Signup/SignupScreen';
import Feed from './FeedPage/Feed';
import Map from './MapScreen/Map';
import RenderList from './ProfileScreen/RenderList';
import HomeScreen from './HomePage/HomeScreen';
import AddDish from './AddReviewScreen/AddDish';
import EditProfile from './ProfileScreen/EditProfile';
import {useUser} from './UserContext'; // Path to your UserContext
import firestore from '@react-native-firebase/firestore';
import FindFriends from './HomePage/FindFriends';
import ViewFriendsProfile from './ProfileScreen/ViewFriendsProfile';
import RenderFollowList from './ProfileScreen/RenderFollowList';

const {width, height} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState();

  const {setUsername} = useUser();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const findUsername = async email => {
    const querySnapshot = await firestore()
      .collection('users') // The name of the collection you're searching
      .where('email', '==', email) // Replace 'username' with the field you're searching by
      .get();

    let foundDocuments = [];
    querySnapshot.forEach(documentSnapshot => {
      // console.log(`Found document with ID ${documentSnapshot.id}`);
      foundDocuments.push(documentSnapshot.data());
    });
    // console.log('FOUND DOCUMENTS', foundDocuments);
    setUsername(foundDocuments[0].username);
    return foundDocuments;
  };

  function onAuthStateChanged(user) {
    if (user) {
      // User is logged in
      // console.log('User is logged in', user);
      findUsername(user.email);
      setUser(user);
    } else {
      // User is not logged in
      // console.log('User is not logged in');
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
        <Tab.Screen name="Home" component={HomeScreen} />

        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="AddNewReview" component={AddNewReviewScreen} />
        {/* <Tab.Screen name="Feed" component={Feed} /> */}
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
        <Stack.Screen name="FriendsProfile" component={ViewFriendsProfile} />

        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Find Friends" component={FindFriends} />
        <Stack.Screen name="Followers/Following" component={RenderFollowList} />

        <Tab.Screen name="YetToReview" component={YetToReviewScreen} />
        <Tab.Screen name="AddDish" component={AddDish} />
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
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6', // Example color: Light Blue
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

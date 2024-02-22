/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import * as React from 'react';
import React, {createContext, useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
import AddDish from './AddDish';
import {FunctionProvider} from './FunctionContext'; // Import the provider

const {width, height} = Dimensions.get('window');

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// // Create a Context
// const FunctionContext = createContext();

// // Context Provider Component
// const FunctionProvider = ({ children }) => {
//   const yourFunction = () => {
//     console.log('This is a passed function!');
//   };

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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
    <FunctionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
          <Stack.Screen
            name="FriendsReviews"
            component={FriendsReviewsScreen}
          />
          <Stack.Screen
            name="FindNewRestaurant"
            component={FindNewRestaurantScreen}
          />
          <Stack.Screen name="Reviewed" component={Reviewed} />
          <Stack.Screen name="YetToReview" component={YetToReviewScreen} />
          <Stack.Screen name="AddNewReview" component={AddNewReviewScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AddDish" component={AddDish} />
        </Stack.Navigator>
      </NavigationContainer>
    </FunctionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

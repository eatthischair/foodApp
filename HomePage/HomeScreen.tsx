import {View, Dimensions} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useContext, useEffect} from 'react';
import {useUser} from '../UserContext'; // Path to your UserContext
// import firestore from '@react-native-firebase/firestore';
import {styles} from '../AppStyles';

// import GetLocation from '../MiscFuns/GetLocation';

// import FindUsernameByEmail from '../DatabaseCalls/index.js';
import UpdateContext from '../MiscFuns/UpdateContext';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import ReviewCaller from '../DatabaseCalls/ReviewCaller';
// import ReviewCaller from '../DatabaseCalls/index.js';
import GetCurrentUser from '../MiscFuns/GetCurrentUser';
import StoreDataAsync from '../MiscFuns/StoreDataAsync';

const {width, height} = Dimensions.get('window');
const HomeScreen = ({route, navigation}) => {
  const {CustomTouchable} = useUser();

  const handleNavigation = screenName => {
    navigation.navigate(screenName);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    // Define an async function inside useEffect

    const fetchData = async () => {
      let user = GetCurrentUser();
      let revs = await ReviewCaller('test1', user).catch(
        'revs not working boss',
      );
      console.log('inside fetch data, boss');
      let yets = await ReviewCaller('test2', user);
      StoreDataAsync(revs, yets);
      console.log('async stored');
    };

    if (isFocused) {
      console.log('is focused, boss');
      fetchData();
    }
  }, [isFocused]);

  // async function findUsernameByEmail(email) {
  //   // simulate fetching username from database
  //   return new Promise(resolve =>
  //     setTimeout(() => resolve('username123'), 1000),
  //   );
  // }

  function processUsername(username) {
    console.log('Processing username:', username);
  }

  useEffect(() => {
    // console.log('route in home', route, route.params);
    if (route.params?.username) {
      updateDisplayName(route.params?.username);
    } else {
      async function getUsernameAndProcess() {
        const username = await FindUsernameByEmail(route.params?.email);
        processUsername(username);
      }
      getUsernameAndProcess();
    }
  }, [route.params]);

  // useEffect(() => {
  //   // console.log('route in home', route, route.params);
  //   updateDisplayName('testapr9');
  // }, []);

  function updateDisplayName(newDisplayName) {
    const user = auth().currentUser;

    if (user) {
      user
        .updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          // console.log('Display name updated!', route.params.username);
          // Optionally, update the local state or perform other actions after the update
        })
        .catch(error => {
          console.error('Error updating display name:', error);
        });
    }
  }
  return (
    <View style={styles.Homecontainer}>
      <CustomTouchable
        title="My Chew"
        onPress={() => handleNavigation('Profile')}
      />
      <CustomTouchable title="Map" onPress={() => handleNavigation('Map')} />
      <CustomTouchable
        title="Find Friends"
        onPress={() => handleNavigation('Find Friends')}
      />
      {/* <CustomTouchable
        title="Friends Chew"
        onPress={() => handleNavigation('Feed')}
      /> */}
      {/* <CustomTouchable title="Verified Chewologists" /> */}
    </View>
  );
};

export default HomeScreen;

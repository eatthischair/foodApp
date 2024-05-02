import {View, Dimensions, Platform} from 'react-native';

import {useContext, useEffect} from 'react';
import {useUser} from '../UserContext'; // Path to your UserContext
// import firestore from '@react-native-firebase/firestore';
import {styles} from './AppStyles';

// import GetLocation from '../MiscFuns/GetLocation';

// import UpdateContext from '../MiscFuns/UpdateContext';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';

import ReviewCaller from '../DatabaseCalls/ReviewCaller';
import GetCurrentUser from '../MiscFuns/GetCurrentUser';
import StoreDataAsync from '../MiscFuns/StoreDataAsync';
import {Button, lightColors, createTheme, ThemeProvider} from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

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

  return (
    <View style={styles.Homecontainer}>
      <CustomTouchable
        title="My Chew"
        onPress={() => handleNavigation('Profile')}
        style={[styles.Homebuttons, styles.MyChew]}
      />
      <CustomTouchable
        title="Map"
        onPress={() => handleNavigation('Map')}
        style={[styles.Homebuttons, styles.Map]}
      />
      <CustomTouchable
        title="Find Friends"
        onPress={() => handleNavigation('Find Friends')}
        style={[styles.Homebuttons, styles.FindFriends]}
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

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useUser} from '../UserContext'; // Path to your UserContext
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({route, navigation}) => {
  const handleNavigation = screenName => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    console.log('route in home', route, route.params);
    if (route.params?.username) {
      updateDisplayName(route.params?.username);
    }
  }, [route.params]);

  function updateDisplayName(newDisplayName) {
    const user = auth().currentUser;

    if (user) {
      user
        .updateProfile({
          displayName: newDisplayName,
        })
        .then(() => {
          console.log('Display name updated!', route.params.username);
          // Optionally, update the local state or perform other actions after the update
        })
        .catch(error => {
          console.error('Error updating display name:', error);
        });
    }
  }

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
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <CustomTouchable
        title="Find Friends"
        onPress={() => handleNavigation('Find Friends')}
      />
      <CustomTouchable
        title="My Chew"
        onPress={() => handleNavigation('Profile')}
      />
      {/* <CustomTouchable
        title="Friends Chew"
        onPress={() => handleNavigation('Feed')}
      /> */}
      {/* <CustomTouchable title="Verified Chewologists" /> */}
      <CustomTouchable title="Map" onPress={() => handleNavigation('Map')} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
    borderRadius: 8,
    height: height / 10,
    width: width / 1.5,
    textAlign: 'center',
    backgroundColor: '#03a9fc',
    marginVertical: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // Adjust based on your UI
  },
});

export default HomeScreen;
